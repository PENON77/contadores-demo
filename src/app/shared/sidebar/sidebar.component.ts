import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 menuItems:any=[]
  constructor( private  serviciosidebar:SidebarService) {
    this.menuItems = serviciosidebar.menu;
    // console.log(this.menuItems);
    
   }

  ngOnInit(): void {
  }

}
