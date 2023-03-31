import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { ITimeSheet } from '../interface/timesheet.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bater-ponto',
  templateUrl: './bater-ponto.component.html',
  styleUrls: ['./bater-ponto.component.css']
})
export class BaterPontoComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'DATA', 'HORA INÍCIO', 'ALMOÇO INÍCIO', 'ALMOÇO FIM', 'HORA FIM', 'AÇÕES'];
  dataSource!: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadingCheguei = false;
  loadingFuiAlmocar = false;
  loadingVoltei = false;
  loadingFui = false;
  loadingTable = false;
  usuario!: string | null;
  dataAtual = new Date();
  dataPtBr = this.dataAtual.toLocaleString("pt-Br");
  horarios!: any;
  id!: any;


  constructor(private AuthGuardService: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('user');
    this.getTimeSheet();
  }

  sair() {
    this.AuthGuardService.logout();
  }

  //Função de Pegar todos os horarios
  getTimeSheet() {
    this.AuthGuardService.getTimesheet().subscribe((retorno: any) => {
      this.horarios = retorno.items;
      this.id = retorno.items[0].id;
      localStorage.setItem('id', this.id);
      this.dataSource = new MatTableDataSource(retorno.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //Função de inserir o horario de cheguei
  cheguei() {
    this.loadingCheguei = true;
    const start = new Date();
    const startDate = start.toISOString();
    const payload = {
      startDate: startDate
    }
    this.AuthGuardService.postTimeSheet(payload).subscribe((retorno: any) => {
      this.horarios = retorno;
      this.loadingCheguei = false;
      this.getTimeSheet();
    })
  }

  //Função de inserir o horario de fuiAlmoçar
  fuiAlmocar() {
    this.loadingFuiAlmocar = true;
    const start = new Date();
    const startLunch = start.toISOString();
    const id = localStorage.getItem('id');
    const payload = {
      startLunch: startLunch
    }
    console.log(payload);
    this.AuthGuardService.putTimeSheet(id, payload).subscribe(((retorno: any) => {
      this.horarios = retorno;
      this.getTimeSheet();
      this.loadingFuiAlmocar = false;
    }))
  }

  //Função de inserir o horario de Voltei
  voltei() {
    this.loadingVoltei = true;
    const start = new Date();
    const endLunch = start.toISOString();
    const id = localStorage.getItem('id');
    const payload = {
      endLunch: endLunch
    }
    this.AuthGuardService.putTimeSheet(id, payload).subscribe(((retorno: any) => {
      this.horarios = retorno;
      this.getTimeSheet();
    }))
    this.loadingVoltei = false;
  }

  //Função de inserir o horario de Fui
  fui() {
    this.loadingFui = true;
    const start = new Date();
    const id = localStorage.getItem('id');
    const payload = {
      end: start.toISOString()
    }
    this.AuthGuardService.putTimeSheet(id, payload).subscribe(((retorno: any) => {
      this.horarios = retorno;
      this.getTimeSheet();
    }))
    this.loadingFui = false;
  }

  deletar(time: ITimeSheet): void {
    this.AuthGuardService.deleteTimeSheet(time.id).subscribe((retorno) => {
      this.toastr.success(`Registro ${time.id} Excluído com Sucesso!`, 'Tudo certo!', {
        timeOut: 3000,
      });
      this.getTimeSheet();
    })
  }

  //Função Filtro da tabela
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
