import { ILogin } from './../interface/login.interface';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dadosLogin: ILogin = {
    userID: null,
    accessKey: null,
    grantType: null
  };

  loginDados!: FormGroup;
  loading = false;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.loginDados = this.formBuilder.group({
      userID: [null, Validators.email],
      accessKey: ['', Validators.required],
      grantType: 'password',
    });
  }


  //Função para executar o login
  login() {
    if (this.loginDados.valid) {
      this.loading = true;
      this.apiService.authentication(this.loginDados.value).subscribe((retorno: any) => {
        this.dadosLogin = retorno;
        localStorage.setItem('token', `${retorno.accessToken}`);
        localStorage.setItem('user', `${retorno.name}`);
        this.loading = false;
        this.router.navigate((['baterPonto']));
        this.toastr.success('Login efetuado com sucesso!', 'Bem-Vindo!', {
          timeOut: 3000,
        });
      },
        error => {
          console.log('error', error);
          this.toastr.error(error.error.message, 'Ops!', {
            timeOut: 3000,
          });
          this.loading = false;
        })
    }
  }



}
