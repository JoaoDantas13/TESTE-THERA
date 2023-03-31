import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILogin } from '../interface/login.interface';
import { ITimeSheet } from '../interface/timesheet.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API: string = 'https://theraponto.dev.thera.com.br:4433/api';

  constructor(private http: HttpClient, private router: Router) { }

  //Função de Authentication
  authentication(login: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.API}/Accounts`, login).pipe(
      map(retorno => retorno));
  }

  //Função trazer os dados
  getTimesheet(): Observable<ITimeSheet[]> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<ITimeSheet[]>(`${this.API}/Timesheet`, httpOptions).pipe(
      map(retorno => retorno));
  }

  //Função cadastrar dados
  postTimeSheet(time: any): Observable<ITimeSheet> {
    console.log('time', time);
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<ITimeSheet>(`${this.API}/Timesheet`, time, httpOptions).pipe(
      map(retorno => retorno));
  }

  //Função editar os dados
  putTimeSheet(id: any, time: any): Observable<ITimeSheet> {
    console.log('id', id);
    console.log('time', time)
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put<ITimeSheet>(`${this.API}/Timesheet/${id}`, time, httpOptions).pipe(
      map(retorno => retorno));
  }

  deleteTimeSheet(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete<any>(`${this.API}/Timesheet/${id}`, httpOptions).pipe(
      map(retorno => retorno));
  }

  //Função verifica Authentication para rotas guard
  isAuthenticated() {
    return (localStorage.getItem('token') !== null ? true : false)
  }

  //Limpar o localStorage
  clear() {
    localStorage.clear();
  }

  //Sair da Aplicação
  logout() {
    this.clear();
    this.router.navigate((['/login']));
  }

}
