import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from './../model/product.model';
import { CartService } from '../service/cart.service';
import { ToastService } from '../service/toast.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  productId: string = '';
  product: any;
  currentUser: any = {};
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.productId = params['categoryId'];
      this.productService.getById(this.productId).subscribe((data) => {
        this.product = data as Product;
      })
    });
  }

  handelQuantity(action: string) {
    if(action === 'down' && this.quantity >= 2) {
      this.quantity--;
      return;
    }

    if(action === 'up') {
      this.quantity++;
      return;
    }
  }

  addToCart() {
    const token = this.cookieService.get('token');
    console.log('🌷🌷🌷 ~ token: ', token)
    this.currentUser = jwt_decode(token);
    const cart = {
      userid: this.currentUser.id,
      productid: this.product.id,
      quantity: this.quantity
    }
    console.log('🌷🌷🌷 ~ cart: ', cart)

    this.cartService.add(cart).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'inserted': {
          this.cartService.oncartChange(err?.error?.text);
          this.toastService.show('Added to cart!');
          break;
        }
      }
    })
  }
}
