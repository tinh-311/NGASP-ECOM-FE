import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiUrl = 'http://alo1234.somee.com/api/User';

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `/GetUsers`);
  }


}
