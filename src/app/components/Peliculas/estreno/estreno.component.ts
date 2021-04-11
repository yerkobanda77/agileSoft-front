import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Pelicula } from 'src/app/models/pelicula';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-estreno',
  templateUrl: './estreno.component.html',
  styleUrls: ['./estreno.component.css']
})
export class EstrenoComponent implements OnInit {

  peliculas: Pelicula[];
  ruta_principal:string;
  pageEstrenos = 1;

  responsiveOptions:any[];
  pagina:number;
  cantidadPeliculas:number;
  event_page:number;

  @Input() displayEstreno:boolean;
  @Output() actionEstreno: EventEmitter<any> = new EventEmitter();

  

  @ViewChild('notifiContent')
  private notifiContent!: Element;

  constructor(private peliculasService: PeliculasService,private messageService: MessageService, private auth:AutenticacionService) {
    this.peliculas = Array<Pelicula>();
    this.ruta_principal = "";
    this.displayEstreno = true;

    this.pagina = 0;
    this.cantidadPeliculas = 20;
    this.event_page = 15;
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


  ngOnInit(): void {
    this.cargarPeliculasEstreno(this.pageEstrenos);
  }

  cargarPeliculasEstreno(pag:number){
    this.peliculasService.getPeliculasEstreno(pag)
      .subscribe(Response => {           
          //console.log(Response);
          this.ruta_principal = Response.imageBaseUrl;
          let pel = Response.data;
          pel.forEach((element: Pelicula) => {
            this.peliculas.push(element);
          });
          this.peliculas = [...this.peliculas];
          if(pag == 1){
            this.pagina = 1;
            setTimeout(() => {
              this.pagina = 0;
            }, 100);
          }
          
        },
        error => {
          if(error.error.statusCode == 401){
            this.solicitarNuevoToken(pag);
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Error al Buscar Peliculas' });
          }
          console.log(error);
          //this.errores = [{ severity: 'error', summary: 'Error:', detail: error.error.message }];
          
      });
  }

  detalle(pelicula:Pelicula){
    let data = {
      pelicula: pelicula,
      ruta_principal: this.ruta_principal
    }
    console.log('actionEstreno detalle');
    this.actionEstreno.emit(data);
  }

  // onScrollDown() {
  //   this.pageEstrenos++;
  //   this.cargarPeliculasEstreno(this.pageEstrenos);
  //   console.log('onScroll');
  // }

  // onWheel(event: WheelEvent): void {
  //   console.log('onWheel');

  //   this.notifiContent.scrollLeft += event.deltaY;
  //   //(<Element>event.target).parentElement.scrollLeft += event.deltaY;
  //   event.preventDefault();
  // }

  page(event:any){      
    console.log("event ",event);  
    if(event.page == this.event_page){
      console.log("ejecutado ",event);
      this.pageEstrenos++;
      this.cargarPeliculasEstreno(this.pageEstrenos);
      this.event_page = this.event_page+20;
    }    
  }

  solicitarNuevoToken(pag:number){
    this.auth.solicitarNuevoToken((resp: boolean)=>{
      if(resp){
        this.cargarPeliculasEstreno(pag);
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error:', detail: 'Error al Buscar Token Nuevamente' });
      }
    });
  }

}
