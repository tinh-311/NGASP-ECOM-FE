import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  hrefMyCart: string = '';
  isHidenBadge: boolean = false;
  cartItemsQuantity: number = 0;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    this.currentUser = jwt_decode(token);
    this.getCartItemsQuantity();
    this.isHidenBadge = this.cartItemsQuantity <= 0;

    this.cartService.cartItem$.subscribe(cart => {
      this.getCartItemsQuantity();
    });
  }

  getCartItemsQuantity() {
    this.cartService.getCarts(this.currentUser.id).subscribe((res: any) => {
      res.cartItems = res?.cartItems?.filter((cartItem: any) => cartItem.quantity > 0);
      this.cartItemsQuantity = res?.cartItems?.length;
      this.isHidenBadge = this.cartItemsQuantity <= 0;
    });
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  logOut() {
    this.cookieService.deleteAll();
    this.reloadCurrentRoute();
    this.toastService.show('Logout successfully!');
  }

  login() {
    this.router.navigate(['/login']);
  }
}
