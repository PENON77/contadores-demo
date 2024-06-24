import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/auth/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public authL ={
    nombre:"",
    password:""
  }

  constructor(private router: Router ,private _httpLogin: LoginService) { }

  ngOnInit(): void {
  }

  login(){   
this._httpLogin.logear(this.authL).subscribe((resp:any)=>{
  // console.log(resp); 
  localStorage.setItem('user',resp.usuarioDB.nombre + " " + resp.usuarioDB.apellidoP + " " + resp.usuarioDB.apellidoM);
  localStorage.setItem('role',resp.usuarioDB.role);
  localStorage.setItem('token',resp.NToken);
  this.router.navigate(['/dashboard']).then(()=>{window.location.reload()});
},(err)=>{
  Swal.fire('USUARIO O CONTRASEÑA INCORRECTA',err.error.msg,'error');
});
  }

}
