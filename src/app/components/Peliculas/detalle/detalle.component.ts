import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Actor } from 'src/app/models/actor';
import { Pelicula } from 'src/app/models/pelicula';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() displayDetalle: boolean;
  @Input() pelicula: Pelicula;
  @Input() ruta_principal: string;

  @Output() actionDetalle: EventEmitter<any> = new EventEmitter();

  @ViewChild('notifiContent')
  private notifiContent!: Element;

  actores: Actor[];
  actoresShow: Actor[];
  responsiveOptions:any[];
  pagina:number;
  cantidadActores:number;
  event_page:number;

  constructor(private auth: AutenticacionService, private peliculasService: PeliculasService, private messageService: MessageService) { 
    this.displayDetalle = false;
    this.pelicula = new Pelicula;
    this.ruta_principal = "";
    this.actores =  Array<Actor>();
    this.actoresShow = Array<Actor>();
    this.pagina = 0;
    this.cantidadActores = 20;
    this.event_page = 9;
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.displayDetalle.currentValue){
      this.actores =  Array<Actor>();
      this.actoresShow = Array<Actor>();
      this.pagina = 0;
      this.cantidadActores = 20;
      this.event_page = 9;
      this.buscarActores();
    }
  }

  ngOnInit(): void {
  }

  buscarActores(){
    this.peliculasService.getActores(this.pelicula.id)
      .subscribe(Response => {     
          this.ruta_principal = Response.imageBaseUrl;
          let pel = Response.data;
          this.actores = pel;

          this.cargarMasActores();         

          this.pagina = 1;
          setTimeout(() => {
            this.pagina = 0;
          }, 100);
        },
        error => {
          if(error.error.statusCode == 401){
            this.auth.solicitarNuevoToken((resp: boolean)=>{
              if(resp){
                this.buscarActores();
              }
              else{
                this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Error al Buscar Token Nuevamente' });
              }
            });
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Error al Buscar Actores' });
          }
          console.log(error);
          
      });
  }

  volver(){
    this.actionDetalle.emit(true);
  }

  cargarMasActores() {
    let loadedactores = this.actores.slice(this.actoresShow.length, this.actoresShow.length+this.cantidadActores);
    loadedactores.forEach(element => {
      this.actoresShow.push(element);
    });
    this.actoresShow = [...this.actoresShow];
    this.cantidadActores = 10;
  }

  page(event:any){    
    if(event.page == this.event_page){
      this.cargarMasActores();
      this.event_page = this.event_page+10;
    }    
  }

}
