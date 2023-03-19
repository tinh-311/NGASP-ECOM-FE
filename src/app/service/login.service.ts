import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://alo1234.somee.com/api';
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private httpClient: HttpClient
  ) { }

  login(user: User) {
    return this.httpClient.post<any>(this.apiUrl + '/User/LoginUser', user, { headers: this.headers });
  }
}
