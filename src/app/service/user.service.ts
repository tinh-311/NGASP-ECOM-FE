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
  apiUrl = 'https://5f0c7a5911b7f60016055e6c.mockapi.io/Api/ahihi';

  //test
  getPost(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }


}
