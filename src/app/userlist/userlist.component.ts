import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Food } from '../shared/model/food';
import { apiService } from '../shared/services/api.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  public food: Food = null;

  constructor(
    private apiservice: apiService
  ) { }



  ngOnInit() {
    this.apiservice.getAllFood().subscribe(
      result => { this.food = result; console.log(this.food);},
      error => { console.log(error);}
    );
  }
}
