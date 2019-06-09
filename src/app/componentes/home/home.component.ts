import { Component, OnInit } from '@angular/core';
// import { MAP_EMBED_API_KEY } from '../secrets';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// tslint:disable-next-line: semicolon
  apikey = 'AIzaSyAykSBm-oMeyLr1S4rB_rqVSstWRgqMckM'
  constructor() { }

  ngOnInit() {
  }

}
