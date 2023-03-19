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

  getCategoryList(): Observable<Catagory[]> {
    return this.httpClient.get<Catagory[]>(this.apiUrl + '/Category/GetCategoryList');
  }

  getById(id: any): Observable<Catagory> {
    return this.httpClient.get<Catagory>(this.apiUrl
      + '/Category/GetProductCategory/id'
      + `?id=${id}`
    );
  }

  //http://alo1234.somee.com/api/Category/UpdateCategory/id
  updateCategory(data: any): Observable<Catagory[]> {
    return this.httpClient.put<Catagory[]>(this.apiUrl + '/Category/UpdateCategory/id', data);
  }

  //http://alo1234.somee.com/api/Category/DeleteCategory?id=1
  deleteCategory(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + `/Category/DeleteCategory?id=${id}`);
  }

  //http://alo1234.somee.com/api/Category/InsertProductCategory
  addCategory(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + `/Category/InsertProductCategory`, data);
  }

}
