import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiUrl = 'http://alo1234.somee.com/api/User';

  getTotal() {
    return this.httpClient.get(this.apiUrl + '/TotalOfUsers');
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `/GetUsers`);
  }

  register(user: User) {
    return this.httpClient.post<any>(this.apiUrl + '/RegisterUser', user);
  }

  editUser(data: any): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + `/Update`, data);
  }

  userByID(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `/GetUser/${id}`);
  }

  deleteUser(id: any): Observable<any> {
    console.log('🌷🌷🌷 ~ id: ', id)
    return this.httpClient.delete<any>(this.apiUrl + `/Delete?id=${id}`)
  }

}
