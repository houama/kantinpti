import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { xToken } from '../../model/loginDetails';
import { Location } from '@angular/common';
import { transition, style, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('inAndOut',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-in',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
              style({ opacity: 0 }))
          ]
        ),
        transition(
          '* => *',
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]),
  ]
})
export class HeaderComponent implements OnInit {
  private token: xToken = { token: null };
  public logStat: boolean = null;

  constructor(
    private api: apiService,
    public route: Router,
    private location: Location
  ) {
    this.logStat = false;
    this.api.currentToken.subscribe(value => {
      console.log(value);
      if (value == null) {
        this.logStat = false;
      } else {
        this.logStat = true;
      }
    },
      err => { console.log(err); });
  }

  ngOnInit() {
    this.token.token = localStorage.getItem('token');
    if (this.token.token == null) {
      this.logStat = false;
    }
    else {
      this.logStat = true;
    }
  }

  onClick() {
    this.token.token = localStorage.getItem('token');
    console.log(this.token);
    if (this.token.token != null) {
      console.log(this.token);
      this.api.postUserVerify(this.token).subscribe(
        res => {
          this.route.navigate(['/homepage']);
        },
        err => {
          console.log(err);
          this.logStat = false;
          this.route.navigate(['']);
        }
      );
    } else {
      this.logStat = false;
      this.route.navigate(['']);
    }
  }

  logIn() {
    this.route.navigate(['login']);
  }

  logOut() {
    this.token.token = null;
    this.logStat = false;
    localStorage.removeItem('token');
    this.api.getCurrentToken();
    this.route.navigate(['login']);
  }

  profileUser() {
    this.route.navigate(['profile']);
  }

  registerUser() {
    this.route.navigate(['register']);
  }

  cancel() {
    if (this.route.url === '/login') {
      this.route.navigate(['']);
    } else {
      this.location.back();
    }
  }
}
