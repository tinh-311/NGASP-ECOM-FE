import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://alo1234.somee.com/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  private cartItemSource = new Subject<any[]>();
  cartItem$ = this.cartItemSource.asObservable();


  constructor(
    private httpClient: HttpClient
  ) { }

  add(cart: any) {
    console.log('🌷🌷🌷 ~ cart: ', cart)
    return this.httpClient.post<any>(this.apiUrl + '/Cart/InsertCartItem/'
    +`${cart.userid}/${cart.productid}/${cart.quantity}`, cart);
  }

  getCarts(userId: string) {
    return this.httpClient.get(this.apiUrl
      + `/Cart/GetActiveCartOfUser/${userId}`
    )
  }

  oncartChange(cart: any) {
    this.cartItemSource.next(cart);
  }
}
