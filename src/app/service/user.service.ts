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

  //http://alo1234.somee.com/api/User/Update
  editUser(data: any): Observable<any> {
    console.log("🚀 ~ UserService ~ data:", data)
    return this.httpClient.put<any>(this.apiUrl + `/Update`, data);
  }

  //http://alo1234.somee.com/api/User/GetUser/5
  userByID(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `/GetUser/${id}`);
  }

//http://alo1234.somee.com/api/User/Delete?id=1
  deleteUser(id: any): Observable<any> {
    console.log("🚀 ~ UserService ~ data:", id)
    return this.httpClient.delete<any>(this.apiUrl + `/Delete?id=${id}`)
  }

}
