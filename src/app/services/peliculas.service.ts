import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  public url: string;
  public httpOptions: any;

  constructor(private _http: HttpClient, private auth:AutenticacionService) {
      this.url = environment.api+environment.puerto+environment.base+'/movies/';
  }

  private getConfig(){
    let payload = this.auth.getPayload();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': payload.type+" "+payload.token
      })
    };
    return httpOptions;
  }

  getPeliculasEstreno(pagina:number) : Observable<any> {    
    return this._http.get<any>(this.url+'now_playing?page='+pagina,this.getConfig());
  }

  getPeliculasPopulares(pagina:number) : Observable<any> {    
    return this._http.get<any>(this.url+'popular?page='+pagina,this.getConfig());
  }

  getActores(id_pelicula:number) : Observable<any> {    
    return this._http.get<any>(this.url+id_pelicula+"/actors",this.getConfig());
  }


  


}
