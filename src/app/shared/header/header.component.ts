import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public role;
public usuario;
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
  }

  salir(){
    this._router.navigateByUrl('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

}
