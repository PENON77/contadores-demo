import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../config/db.js';
@Injectable({
  providedIn: 'root'
})
export class PagosService {
public url;
  constructor( private _http: HttpClient) { 
this.url =urls;
  }

  // obtenerUsers(){
  //   const url = `${this.url}/obtener/datos/users`;
  //   return this._http.get( url );
  //   console.log(url); 
  // }

  // agregarUsuario(body : any){
  //   const url =`${this.url}/new/user`;
  //   return this._http.post(url,body);

  // }

  // actualizarUsuarioPass(id:any,body:any){
  //   const url =`${this.url}/update/resgistro/${id}`;
  //   return this._http.put(url,body);
  // }

  // eliminarResgistroUser(id:any){
  //   const url =`${this.url}//delete/registro/new/${id}`;
  //   return this._http.delete(url);
  // }
  agregarVenta(body:any){
    const url =`${this.url}/add/pago/centro/escolar`;
    return this._http.post(url,body);
  }
  getUltimoFolio(){
    const url=`${this.url}/get/ultimo/folio`;
    return this._http.get(url);
  }
  obtenerFechas(date:any){
    const url=`${this.url}/get/fecha/${date}`;
    return this._http.get(url);
  }

  obtenerFechasConcepto(date:any, conce:any){
    const url=`${this.url}/get/fecha/concepto/${date}/${conce}`;
    return this._http.get(url);
  }

  obtenerConcepto(conce:any){
    const url=`${this.url}/get/concepto/${conce}`;
    return this._http.get(url);
  }

}
