import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Catagory } from './../model/Catagory.model';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { Product } from './../model/product.model';
import { CartService } from '../service/cart.service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  categoryId: string = '';
  categoryData: any = {};

  rangeValue: number = 0;
  minValue: number = 0;
  maxValue: number = 0;

  paginationLength: number = 0;

  products: Product[] = [];
  productsOriginal: Product[] = [];
  productsPage: Product[] = [];

  pageCurrent: number = 1;
  productArrayFilter: number = 6;
  totalItems: number = 0;

  currentUser: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.categoryService.getById(this.categoryId)
      .subscribe((data: Catagory) => {
        this.categoryData = data;
        this.getProducts();
      });
    });
  }

  addToCart(product: any) {
    const token = this.cookieService.get('token');
    this.currentUser = jwt_decode(token);
    const cart = {
      userid: this.currentUser.id,
      productid: product.id,
      quantity: 1
    }

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

  onRangeChange() {
    this.maxValue = this.rangeValue;
  }

  onMaxChange() {
    this.rangeValue = this.maxValue;
  }

  filterPrice() {
    this.products = this.productsOriginal.filter((product: any) => product.price >= this.minValue && product.price <= this.maxValue);
    this.totalItems = this.products.length;
  }

  clearFilter() {
    this.products = this.productsOriginal;
    this.totalItems = this.products.length;
    this.rangeValue = 0;
    this.maxValue = 0;
    this.minValue = 0;
  }

  getProducts() {
    const categoryParam: {} = {
      category: this.categoryData.category,
      subCategory: this.categoryData.subCategory
    }

    this.productService.getAll(categoryParam).subscribe((data) => {
      this.products = data as Product[];
      this.productsOriginal = this.products;
      this.totalItems = this.products.length;
    })
  }

  arrayFromNumber(num: number) {
    return Array.from({length: num}, (_, i) => i);
  }

  formatTitle(title: any): string {
    return title?.slice(0, 32) + '...';
  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { categoryId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }
}
