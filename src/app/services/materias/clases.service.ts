import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../config/db.js';
@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  public url;
  constructor(private _http: HttpClient) { 
    this.url =urls;
  }

  agregarMate(body:any){
    const url =`${this.url}/add/materias/files`;
    return this._http.post(url,body);
  }
  
  obtenerMate(seccion:any){
    const url =`${this.url}/get/materias/all/${seccion}`;
    return this._http.get(url);
  }


}
