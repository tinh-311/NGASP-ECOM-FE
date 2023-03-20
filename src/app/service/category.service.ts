import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catagory } from '../model/Catagory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'http://alo1234.somee.com/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  getTotal() {
    return this.httpClient.get(this.apiUrl + '/Category/TotalOfCategories');
  }

  getCategoryList(): Observable<Catagory[]> {
    return this.httpClient.get<Catagory[]>(this.apiUrl + '/Category/GetCategoryList');
  }

  getById(id: any): Observable<Catagory> {
    return this.httpClient.get<Catagory>(this.apiUrl
      + '/Category/GetProductCategory/id'
      + `?id=${id}`
    );
  }

  updateCategory(data: any): Observable<Catagory[]> {
    return this.httpClient.put<Catagory[]>(this.apiUrl + '/Category/UpdateCategory/id', data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + `/Category/DeleteCategory?id=${id}`);
  }

  addCategory(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + `/Category/InsertProductCategory`, data);
  }

}
