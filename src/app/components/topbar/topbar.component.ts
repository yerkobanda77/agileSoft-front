import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  items = [];
  usuario:Usuario;

  constructor(private auth: AutenticacionService) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    this.usuario = this.auth.getUserLogin();    
  }

  cerrarSesion(){
    Swal.fire({
      icon: 'warning',
      title: '¿Está seguro que desea Cerrar Sesión?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {        
        localStorage.removeItem('data');        
        location.href = '/login';
      }
    })
  }

}
