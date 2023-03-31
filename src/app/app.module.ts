import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaterPontoComponent } from './bater-ponto/bater-ponto.component';
import { ApiService } from './service/api.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { CountdownModule } from 'ngx-countdown';
import { ToastrModule } from 'ngx-toastr';


//Angular Material
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BaterPontoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    CountdownModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    SweetAlert2Module,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    MatSortModule,
    MatIconModule
  ],
  providers: [ApiService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
