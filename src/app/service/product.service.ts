import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../model/product.model';
import { Catagory } from './../model/Catagory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://alo1234.somee.com/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(categoryParams: any) {
    return this.httpClient.get(this.apiUrl
      + '/Product/GetProducts'
      + `?category=${categoryParams?.category}&subcategory=${categoryParams?.subCategory}&count=10000`
    );
  }
}
