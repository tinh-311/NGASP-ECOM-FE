import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { PaymentMenthodService } from '../service/payment-menthod.service';
import { CartService } from '../service/cart.service';

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
  ) {}

  ngOnInit() {
    const token = this.cookieService.get('token');
    this.currentUser = jwt_decode(token);

    this.getCart();

    this.paymentMenthodsService.getAll().subscribe((res: any) => {
      this.paymentMenthods = res;
      this.selectedPaymentMethodId = this.paymentMenthods[0]?.id;
    })

    this.buildCheckoutForm();
    this.buildShipInfoForm();
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

  cancelEdit() {
    this.cartItemEdit = null;
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
