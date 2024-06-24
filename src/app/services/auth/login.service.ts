import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../config/db.js';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
public url;
  constructor(private _http: HttpClient) {
    this.url = urls;
    }
    logear(body:any){
      const url =`${this.url}/api/login`;
      return this._http.post(url,body);
    }

}
