import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  cartItemEdit: any = null;
  quantityEdit: number = 1;

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

  deleteCartItem(cartItem: any) {
    const parmas = {
      userId: this.currentUser?.id,
      productId: cartItem?.product?.id,
      quantity: cartItem?.quantity
    }

    this.cartService.deleteCarts(parmas).subscribe((res: any) => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'deleted': {
          this.toastService.show('Deleted')
          this.cartService.oncartChange(err?.error?.text);
          this.getCart();
          break;
        }
      }
    })
  }

  onCartItemClick(cartItem: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: cartItem?.product?.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }

  edit(cartItem: any) {
    if(!this.cartItemEdit) {
      this.cartItemEdit = cartItem;
      this.quantityEdit = cartItem?.quantity;
      return;
    }

    if(cartItem?.id === this.cartItemEdit?.id) {
      this.cartItemEdit = null;
    }
  }

  cancelEdit() {
    this.cartItemEdit = null;
  }

  saveEidt(product: any) {
    const token = this.cookieService.get('token');
    this.currentUser = jwt_decode(token);
    const cart = {
      userid: this.currentUser.id,
      productid: product.id,
      quantity: this.quantityEdit
    }

    this.cartService.updateQuantity(cart).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'updated': {
          this.cartService.oncartChange(err?.error?.text);
          this.toastService.show('Updated cart successfully!');
          this.cancelEdit();
          break;
        }
      }
    })
  }

  deleteAllCarts() {

  }

  getCart() {
    this.cartService.getCarts(this.currentUser?.id).subscribe((res: any) => {
      res.cartItems = res?.cartItems?.filter((cartItem: any) =>
        cartItem.quantity > 0
        && cartItem?.product?.id !== 0
        && cartItem.product?.title !== ''
      );
      this.cartItems = res?.cartItems;
    })
  }
}
