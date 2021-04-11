import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Login } from 'src/app/models/login';
import { Payload } from 'src/app/models/payload';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  
  //Modelos
  usuario: Usuario;
  login: Login;
  payload: Payload

  //Variables Utilitarias
  classUsername:string;
  classPassword:string;
  errores: Message[];
  encryptSecretKey = environment.encryptSecretKey;

  constructor(private messageService: MessageService, private autenticacionService:AutenticacionService, private router: Router ) { 
    this.usuario = new Usuario();
    this.login = new Login();
    this.payload = new Payload();
    this.classPassword = "";
    this.classUsername = "";
    this.errores = [];
  }

  ngOnInit(): void {
  }

  validarLogin(){
    
    if(this.login.username.trim() != '' && this.login.password.trim() != ''){
      this.autenticacionService.login(this.login)
      .subscribe(Response => {
           
          this.usuario = Response.data.user; 
          this.payload = Response.data.payload;    
          let params = {
            usuario: this.usuario,
            payload: this.payload
          }
          let data = CryptoJS.AES.encrypt(JSON.stringify(params), this.encryptSecretKey).toString();
          localStorage.setItem('data', data);        
          location.href = '/Home';
        },
        error => {
          console.log(error);
          this.errores = [{ severity: 'error', summary: 'Error:', detail: error.error.message }];
      });
    }
    else{
      if(this.login.username.trim() == ''){
        this.classUsername = "ng-invalid ng-dirty";
      }
      if(this.login.password.trim() == ''){
        this.classPassword = "ng-invalid ng-dirty";
      }
    }
  }

  limpiarErrores(tipo: number,event:any){
    if(tipo == 0){
      this.classUsername = "";
    }
    if(tipo == 1){
      this.classPassword = "";
    }
    this.errores = [];
    if(event.key == 'Enter'){
      this.validarLogin();
    }  
  }

}
