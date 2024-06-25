import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlumnosPipe } from './alumnos.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CatalogolibrosComponent } from './pages/catalogolibros/catalogolibros.component';
import { CentroescolarComponent } from './pages/centroescolar/centroescolar.component';
import { CortecajaComponent } from './pages/cortecaja/cortecaja/cortecaja.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { NofoundpageComponent } from './pages/nofoundpage/nofoundpage.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NofoundpageComponent,
    HeaderComponent,
    SidebarComponent,
    PagesComponent,
    CentroescolarComponent,
    CatalogolibrosComponent,
    CortecajaComponent,
    EstudiantesComponent,
    AlumnosPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
