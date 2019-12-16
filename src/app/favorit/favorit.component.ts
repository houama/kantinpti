import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorit',
  templateUrl: './favorit.component.html',
  styleUrls: ['./favorit.component.scss']
})
export class FavoritComponent implements OnInit {

  public arrFavorit:string[]=[];
  constructor() { }

  ngOnInit() {
    this.arrFavorit = JSON.parse(localStorage.getItem('favoritList'));
    console.log(this.arrFavorit);
  }

}
