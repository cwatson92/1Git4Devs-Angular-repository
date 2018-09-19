import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   openSlideMenu(){
    console.log("clicked")
   document.getElementById('side-menu').style.width = '250px';
  //  document.getElementById('main').style.marginLeft = '250px';
  }
   closeSlideMenu(){
    document.getElementById('side-menu').style.width = '0';
    // document.getElementById('main').style.marginLeft = '0';
  }

}
