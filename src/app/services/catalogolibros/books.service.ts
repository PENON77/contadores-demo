import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../config/db.js';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
public url;
  constructor(private _http: HttpClient) {
    this.url =urls;
  }

  agregarBook(body:any){
    const url =`${this.url}/agregar/libro`;
    return this._http.post(url,body);
  }
  eliminarBook(id:any){
    const url =`${this.url}/delete/book/${id}`;
    return this._http.delete(url);
  }
  obtenerLibros(){
    const url =`${this.url}/get/libros/all`;
    return this._http.get(url);
  }
  libroName(name:any){
    const url =`${this.url}/get/libro/${name}`;
    return this._http.get(url);
  }

}
