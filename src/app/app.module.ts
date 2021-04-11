import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//COMPONENTES SISTEMA
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/Peliculas/home/home.component';
import { DetalleComponent } from './components/Peliculas/detalle/detalle.component';
import { AuthorizatedGuard } from './services/guard/AuthorizatedGuard';
import { TopbarComponent } from './components/topbar/topbar.component';

//COMPONENTES PRIMENG
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CarouselModule} from 'primeng/carousel';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EstrenoComponent } from './components/Peliculas/estreno/estreno.component';
import { PopularesComponent } from './components/Peliculas/populares/populares.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DetalleComponent,
    TopbarComponent,
    EstrenoComponent,
    PopularesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    MenubarModule,
    TooltipModule,
    ToastModule,
    VirtualScrollerModule,
    CarouselModule,
    InfiniteScrollModule,
    
  ],
  providers: [
    MessageService,  
    AuthorizatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

