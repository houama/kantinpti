import { Component, OnInit } from '@angular/core';
import { LoginDetails, authTkn } from '../shared/model/loginDetails';
import { apiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { transition, trigger, style, animate } from '@angular/animations';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('1s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1s ease-out', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {

  loginDetail = new LoginDetails('', '', false);

  public authTkn: authTkn = null;

  loginForm = this.fb.group({
    user_name: ['', Validators.required],
    password: ['', Validators.required],
    remember_me: [false],
  });


  constructor(private api: apiService, private route: Router, private fb: FormBuilder) { }

  get password() {
    return this.loginForm.controls.password;
  }
  get user_name() {
    return this.loginForm.controls.user_name;
  }
  ngOnInit() {
  }

  showPass() {
    console.log('ok');
    const pass = $('#pass');
    if (pass.attr('type') === 'password') {
      pass.attr('type', 'text');
      $('#visibility').removeClass('fa-eye');
      $('#visibility').addClass('fa-eye-slash');
    } else {
      pass.attr('type', 'password');
      $('#visibility').removeClass('fa-eye-slash');
      $('#visibility').addClass('fa-eye');
    }
  }


  onSubmit() {
    this.loginForm.controls.password.patchValue(
      CryptoJS.SHA512(this.loginForm.value.password).toString()
    );
    console.log(this.loginForm.value);
    this.api.postUserLogin(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.authTkn = res;
        console.log(this.authTkn);
        localStorage.setItem('token', this.authTkn.token);
        this.api.getCurrentToken();
        this.route.navigate(['/userlist']);
        alert(this.authTkn.info);
      },
      error => {
        console.log(error);
        alert(error.error.message);
      }
    );

    localStorage.setItem('user_name', this.loginForm.value.user_name);
    this.loginForm.reset();
  }

}
