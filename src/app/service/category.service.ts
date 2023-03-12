import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catagory } from '../model/Catagory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiCategoryUrl = 'http://alo1234.somee.com/GetCategoryList';

  getCategoryList(): Observable<Catagory[]> {
    return this.httpClient.get<Catagory[]>(this.apiCategoryUrl);
  }

}
