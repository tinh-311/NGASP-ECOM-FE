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
    return this.httpClient.post<any>(this.apiUrl + '/Cart/InsertCartItem/'
    +`${cart.userid}/${cart.productid}/${cart.quantity}`, cart);
  }

  deleteCarts(params: any) {
    return this.httpClient.delete(
      this.apiUrl
      + `/Cart/DeleteCartItem/${params.userId}/${params.productId}/${params.quantity}`,
      params
    )
  }

  deleteAll(id: any) {
    return this.httpClient.delete(
      this.apiUrl
      + `/Cart/DeleteAllCartItem/${id}`,
      id
    )
  }

  getCarts(userId: string) {
    return this.httpClient.get(this.apiUrl
      + `/Cart/GetActiveCartOfUser/${userId}`
    )
  }

  updateQuantity(cart: any) {
    return this.httpClient.put<any>(this.apiUrl + '/Cart/UpdateCartItemQuantity/'
    +`${cart.userid}/${cart.productid}/${cart.quantity}`, cart);
  }

  oncartChange(cart: any) {
    this.cartItemSource.next(cart);
  }
}
