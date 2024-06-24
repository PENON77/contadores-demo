import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CatalogolibrosComponent } from './pages/catalogolibros/catalogolibros.component';
import { CentroescolarComponent } from './pages/centroescolar/centroescolar.component';
import { CortecajaComponent } from './pages/cortecaja/cortecaja/cortecaja.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { NofoundpageComponent } from './pages/nofoundpage/nofoundpage.component';
import { PagesComponent } from './pages/pages.component';




const routes: Routes = [
  
  {path:'dashboard',
  component: PagesComponent,
  children:[
  {path:'', component:DashboardComponent},
  {path:"centroescolares", component:CentroescolarComponent},
  {path:"catalogolibros", component:CatalogolibrosComponent},
  {path:"cortecaja", component:CortecajaComponent},
  {path:"estudiantes", component:EstudiantesComponent},
  // { path: '/dashboard', redirectTo: '/dashboard'},
  
]
},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component:LoginComponent},
  { path: '**', component: NofoundpageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
