import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../config/db.js';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
public url;
  constructor(private _http: HttpClient) { 
    this.url =urls;
  }

  agregarStudents(body:any){
    const url =`${this.url}/add/students/files`;
    return this._http.post(url,body);
  }
  
  obtenerStudents(){
    const url =`${this.url}/get/students/all`;
    return this._http.get(url);
  }

}
