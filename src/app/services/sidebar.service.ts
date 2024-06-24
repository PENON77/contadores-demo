import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]=[{
    titulo:'Dashboard',url:'dashboard',
    icono: 'mdi mdi-gauge',
    submenu:[
      // {titulo:'Principal', url:'/'},
      {titulo:'Centro Escolares', url:'centroescolares'},
      {titulo:'Catalogo Libros', url:'catalogolibros'},
      {titulo:'Corte Caja', url:'cortecaja'},
      {titulo:'Estudiantes', url:'estudiantes'}
    ]
  }]

  constructor() { }
}
