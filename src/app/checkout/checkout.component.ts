import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { PaymentMenthodService } from '../service/payment-menthod.service';
import { CartService } from '../service/cart.service';
import { PaymentService } from '../service/payment.service';
import { combineLatest } from 'rxjs';
import { UserService } from '../service/user.service';
import { User } from './../model/User.model';
import { LoginService } from '../service/login.service';
import { LoadingService } from '../service/loading.service';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  paymentMenthods: any = []
  currentUser: any;
  cartItems: any;
  cartItemEdit: any = null;
  quantityEdit: number = 1;
  shippingCost: number = 30000;
  discount: number = 0;

  selectedPaymentMethodId: number = 0;
  loading: boolean = false;

  checkoutForm: any = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
  });

  shipInfoForm: any = this.fb.group({
    paymentMenthod: ['', [Validators.required]],
    address: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private cookieService: CookieService,
    private paymentMenthodsService: PaymentMenthodService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private userService: UserService,
    private loginService: LoginService,
    public loadingService: LoadingService,
    public orderService: OrderService,
  ) {}

  ngOnInit() {
    this.loadingService.showLoading();
    const token = this.cookieService.get('token');
    this.currentUser = jwt_decode(token);

    this.getCart();
    this.paymentMenthodsService.getAll().subscribe((res: any) => {
      this.paymentMenthods = res;
      this.selectedPaymentMethodId = this.paymentMenthods[this.paymentMenthods?.length - 1]?.id;
      this.loadingService.hideLoading();
    })

    this.buildCheckoutForm();
    this.buildShipInfoForm();
  }

  checkout() {
    this.loadingService.showLoading();
    const paymentMenthod = this.paymentMenthods.find((res: any) => res?.id === this.shipInfoForm.value.paymentMenthod);
    const paymentParams: any = {
      'paymentMethodId': paymentMenthod?.id,
      'userId': this.currentUser?.id,
      'totalAmount': this.getTotalPrice() +  this.shippingCost - this.discount,
      'shipingCharges': this.shippingCost,
      'amountReduced': 0,
      'amountPaid': 0,
    }

    this.userService.userByID(this.currentUser.id).subscribe((user) => {
      let u: User = {...user}
      u.firstName = this.checkoutForm.value.firstName;
      u.lastName = this.checkoutForm.value.lastName;
      u.mobile = this.checkoutForm.value.phone;
      u.email = this.checkoutForm.value.email;
      u.address = this.shipInfoForm.value.address;


      this.userService.editUser(u)
      .subscribe((user) => {
      }, (err) => {
        this.loginService.login({
          email: u.email,
          password: u.password
        }).subscribe(res => {
        }, async (err) => {
          switch(err?.error?.text) {
            default: {
              const tokenString = err?.error?.text;
              await this.cookieService.set('token', tokenString);
              const token = this.cookieService.get('token');
              this.currentUser = jwt_decode(token);

              this.paymentService.add(paymentParams).subscribe((res: any) => {
                this.cartService.deleteAll(this.currentUser.id).subscribe(res => {
                }, (err) => {
                  this.cartService.oncartChange(err?.error?.text);
                })

                this.router.navigate(['/thankyou']);
                this.loadingService.hideLoading();
              }, (err) => {
              })
              break;
            }
          }
        })
      })
    })
  }

  deleteCartItem(cartItem: any) {
    this.loadingService.showLoading();
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
          this.loadingService.hideLoading();
          break;
        }
      }
    })
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

  saveEidt(product: any) {
    this.loadingService.showLoading();
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
          this.getCart();
          this.cancelEdit();
          this.loadingService.hideLoading();
          break;
        }
      }
    })
  }

  cancelEdit() {
    this.cartItemEdit = null;
  }

  getCart() {
    this.loadingService.showLoading();
    this.cartService.getCarts(this.currentUser?.id).subscribe((res: any) => {
      res.cartItems = res?.cartItems?.filter((cartItem: any) =>
        cartItem.quantity > 0
        && cartItem?.product?.id !== 0
        && cartItem.product?.title !== ''
      );
      this.cartItems = res?.cartItems;
      this.loadingService.hideLoading();
    })
  }

  buildCheckoutForm() {
    this.checkoutForm = this.fb.group({
      firstName: [this.currentUser?.firstName, [Validators.required]],
      lastName: [this.currentUser?.lastName],
      phone: [this.currentUser?.mobile, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [this.currentUser?.email, [Validators.required, Validators.email]],
    });
  }

  buildShipInfoForm() {
    this.shipInfoForm = this.fb.group({
      paymentMenthod: ['', [Validators.required]],
      address: [this.currentUser?.address, Validators.required],
    });
  }
}
