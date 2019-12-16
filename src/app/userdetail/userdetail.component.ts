import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Food } from '../shared/model/food';
import { apiService } from '../shared/services/api.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {

  public food: Food = null;

  constructor(
    private api: apiService,
    public activatedRoute: ActivatedRoute
  ) { }

  toList: string[]=[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.api.getFoodByKode(params.kode).subscribe(
        result => { this.food = result; console.log(this.food);},
        error => { console.log(error);}
      )
    });
  }

  
  addtoFavorit(data:string){
    console.log(data);
    this.toList = localStorage.getItem('favoritList') ? JSON.parse(localStorage.getItem('favoritList')) : [];
    this.toList.push(data);
    localStorage.setItem('favoritList', JSON.stringify(this.toList));
    console.log(this.toList);
  };

  

}
