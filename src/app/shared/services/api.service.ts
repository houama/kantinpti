import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { authTkn, uData } from '../model/loginDetails';
import { Food } from '../model/food';


@Injectable({
  providedIn: 'root'
})

export class apiService {


  public currentToken: BehaviorSubject<any>;
  public token: Observable<string>;

  private baseUrl = 'https://umn-pti2019.herokuapp.com/api/';
  constructor(private http: HttpClient) {
    this.currentToken = new BehaviorSubject<any>("null");
  }

  getCurrentToken() {
    this.currentToken.next(localStorage.getItem('token'));
  }

  getAllFood(): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}kantin`);
  }
  
  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}kantin/${id}`);
  }
  
  getFoodByKode(kode: number): Observable<Food> {
    return this.http.get<Food>(`${this.baseUrl}kantin/${kode}`);
  }
  
  postUserLogin(model: any): Observable<authTkn> {
    return this.http.post<authTkn>(this.baseUrl + 'login', model);
  }

  postUserRegister(model: any): Observable<authTkn> {
    return this.http.post<authTkn>(this.baseUrl + 'register', model);
  }
  postUserUpdate(model: any): Observable<authTkn> {
    return this.http.put<authTkn>(this.baseUrl + 'update', model);
  }
  postUserVerify(model: any): Observable<uData> {
    return this.http.post<uData>(this.baseUrl + 'verify', model);
  }

  viewUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user/' + localStorage.getItem('user_name'));
  }


}
