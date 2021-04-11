import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Payload } from '../models/payload';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  public url: string;
  public httpOptions: any;
  encryptSecretKey = environment.encryptSecretKey;

  constructor(private _http: HttpClient) {
      this.url = environment.api+environment.puerto+environment.base+'/auth/';
  }

  login(login:Login) : Observable<any> {    
    return this._http.post<any>(this.url+'login',login);
  }

  refresh(data:any) : Observable<any> {   
    return this._http.post<any>(this.url+'refresh',data);
  }

  getUserLogin():Usuario{
    let usuario = new Usuario;
    if(localStorage.getItem('data') != null){
      let resp = this.decryptData(localStorage.getItem('data')); 
      if(resp.valida){
        usuario = resp.usuario;
      }      
    }
    return usuario;    
  }

  getPayload():Payload{
    let payload = new Payload;
    if(localStorage.getItem('data') != null){
      let resp = this.decryptData(localStorage.getItem('data')); 
      if(resp.valida){
        payload = resp.payload;
      }      
    }
    return payload;    
  }

  decryptData(data:any) {
    let resp = {
      valida: false,
      usuario: new Usuario,
      payload: new Payload
    }
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        resp.usuario = data.usuario;
        resp.payload = data.payload;
        resp.valida = true;
        return resp;
      }
      return resp;
    } catch (e) {
      console.log(e);
      return resp;
    }
  }

  solicitarNuevoToken(callback: { (resp: any): void; (arg0: boolean): void; }){
    let payload = this.getPayload();
    let data = {refresh_token: payload.refresh_token}
    this.refresh(data)
      .subscribe(Response => {           
          console.log(Response); 
          payload.token = Response.data.payload.token;    
          let params = {
            usuario: this.getUserLogin(),
            payload: payload
          }
          let data = CryptoJS.AES.encrypt(JSON.stringify(params), this.encryptSecretKey).toString();
          localStorage.setItem('data', data);  
          callback(true);      
        },
        error => {   
          callback(false);       
          console.log(error);
      });
  }
}
