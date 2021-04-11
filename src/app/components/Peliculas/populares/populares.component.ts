import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Pelicula } from 'src/app/models/pelicula';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-populares',
  templateUrl: './populares.component.html',
  styleUrls: ['./populares.component.css']
})
export class PopularesComponent implements OnInit {

  peliculas: Pelicula[];
  peliculasPopulares: Pelicula[];
  peliculasAgrupadas: any[] = [];
  ruta_principal:string;

  pagePopulares = 1;

  @Input() displayPopulares:boolean;
  @Output() actionPopulares: EventEmitter<any> = new EventEmitter();

  constructor(private peliculasService: PeliculasService,private messageService: MessageService, private auth:AutenticacionService) {
    this.peliculas = Array<Pelicula>();
    this.peliculasPopulares = Array<Pelicula>();
    this.ruta_principal = "";
    this.displayPopulares = true;
   }


  ngOnInit(): void {
    this.cargarPeliculasPopulares(this.pagePopulares);
  }

  cargarPeliculasPopulares(page:number){
    
    this.peliculasService.getPeliculasPopulares(page)
      .subscribe(Response => {           
          //console.log(Response);
          this.ruta_principal = Response.imageBaseUrl;
            this.peliculasPopulares = Response.data;
            let contador = 0;
            let row: any[] = [];
            this.peliculasPopulares.forEach((element: any) => {
              row.push(element);
              contador++;
              if(contador == 4){
                this.peliculasAgrupadas.push(row);
                contador = 0;
                row = [];
              }
            });
            this.peliculasAgrupadas = [...this.peliculasAgrupadas];
          
        },
        error => {
          if(error.error.statusCode == 401){
            this.auth.solicitarNuevoToken((resp: boolean)=>{
              if(resp){
                this.cargarPeliculasPopulares(page);
              }
              else{
                this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Error al Buscar Token Nuevamente' });
              }
            });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Error al Buscar Peliculas Populares' });
          }
          console.log(error);
          
      });
  }

  loadCarsLazy(event: LazyLoadEvent) {       
        this.pagePopulares++;
        this.cargarPeliculasPopulares(this.pagePopulares);        
  }

  detalle(pelicula:Pelicula){
    let data = {
      pelicula: pelicula,
      ruta_principal: this.ruta_principal
    }    
    this.actionPopulares.emit(data);
  }

}
