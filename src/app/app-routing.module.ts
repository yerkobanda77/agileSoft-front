import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DetalleComponent } from './components/Peliculas/detalle/detalle.component';
import { HomeComponent } from './components/Peliculas/home/home.component';
import { AuthorizatedGuard } from './services/guard/AuthorizatedGuard';

const routes: Routes = [  
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthorizatedGuard]
  },
  {
    path: 'Detalle',
    component: DetalleComponent,
    canActivate: [AuthorizatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
