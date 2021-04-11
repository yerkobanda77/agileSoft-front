import { Component, OnInit, ViewChild } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayPopulares:boolean;
  displayEstreno:boolean;
  displayDetalle: boolean;
  pelicula:Pelicula;
  ruta_principal:string;

  constructor() {
    this.displayEstreno = true;
    this.displayPopulares = true;
    this.displayDetalle = false;
    this.pelicula = new Pelicula();
    this.ruta_principal = "";
  }

  ngOnInit(): void {

  }

  actionEstreno(data:any){
    this.ruta_principal = data.ruta_principal;
    this.pelicula = data.pelicula;
    this.displayDetalle = true;
    this.displayEstreno = false;
    this.displayPopulares = false;
  }

  actionPopulares(data:any){
    this.ruta_principal = data.ruta_principal;
    this.pelicula = data.pelicula;
    this.displayDetalle = true;
    this.displayEstreno = false;
    this.displayPopulares = false;
  }

  actionDetalle(data:any){
    this.displayDetalle = false;
    this.displayEstreno = true;
    this.displayPopulares = true;
  }
  


}
