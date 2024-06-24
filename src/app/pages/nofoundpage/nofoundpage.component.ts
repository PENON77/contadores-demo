import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nofoundpage',
  templateUrl: './nofoundpage.component.html',
  styleUrls: ['./nofoundpage.component.css']
})
export class NofoundpageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cargar(){
    this.router.navigate(['/dashboard']).then(()=>{window.location.reload()});
  }

}
