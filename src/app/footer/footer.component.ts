import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';
import { ToastService } from '../service/toast.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';
import { User } from '../model/User.model';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  cartItems: any;
  currentUser: any = {};

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.cartService.cartItem$.subscribe(cart => {
      const token = this.cookieService.get('token');
      this.currentUser = jwt_decode(token);
      this.getCart();
    });

    const token = this.cookieService.get('token');
      this.currentUser = jwt_decode(token);
      this.getCart();
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    if(!this.cartItems?.length) {
      return 0;
    }

    for (const cartItem of this.cartItems) {
      totalPrice += cartItem.quantity * cartItem.product.price;
    }
    return totalPrice;
  }


  getCart() {
    this.cartService.getCarts(this.currentUser?.id).subscribe((res: any) => {
      this.cartItems = res?.cartItems;
      console.log('🌷🌷🌷 ~ this.products: ', this.cartItems)
    })
  }
}
