import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AutenticacionService } from '../autenticacion.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

    constructor(private router: Router, private auth: AutenticacionService) { }
    encryptSecretKey = environment.encryptSecretKey;
   

    canActivate() {
        if (localStorage.getItem('data') != null) {
          let resp = this.auth.decryptData(localStorage.getItem('data'));
          if(resp.valida){
              return true;
          }
        }
        this.router.navigate(['/login']);
        return false;
    }  

}
