import { authTkn } from './../shared/model/loginDetails';
import { apiService } from './../shared/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
        )
      ]
    ),
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('1s ease-in', style({ opacity: 1 })),
      ])
    ]),
  ]
})
export class RegisterComponent implements OnInit {

  private authTkn: authTkn;

  registerForm = this.fb.group({
    user_name: ['', Validators.required],
    nama_lengkap: ['', Validators.required],
    telepon: ['', Validators.required],
    email: ['', Validators.required],
    alamat: ['', Validators.required],
    tanggal_lahir: ['', Validators.required],
    foto: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private api: apiService,
    private route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

  }

  get user_name() {
    return this.registerForm.controls.user_name;
  }
  get fullname() {
    return this.registerForm.controls.nama_lengkap;
  }
  get telepon() {
    return this.registerForm.controls.telepon;
  }
  get email() {
    return this.registerForm.controls.email;
  }
  get alamat() {
    return this.registerForm.controls.alamat;
  }
  get birthdate() {
    return this.registerForm.controls.birthdate;
  }
  get foto() {
    return this.registerForm.controls.foto;
  }

  get password() {
    return this.registerForm.controls.password;
  }


  onSubmit() {
    this.registerForm.controls.password.patchValue(
      CryptoJS.SHA512(this.registerForm.value.password).toString()
    );
    console.log(this.registerForm.value);
    this.api.postUserRegister(this.registerForm.value).subscribe(
      res => {
        console.log(res);
        this.authTkn = res;
        console.log(this.authTkn);
        localStorage.setItem('token', this.authTkn.token);
        this.api.getCurrentToken();
        this.route.navigate(['/hompage']);
        alert(this.authTkn.info);
      },
      error => {
        console.log(error);
        alert(error.error.message);
      }
    );
  }
}
