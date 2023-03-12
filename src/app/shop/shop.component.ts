import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Catagory } from './../model/Catagory.model';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { Product } from './../model/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  categoryId: string = '';
  categoryData : Catagory = {};

  rangeValue: number = 0;
  minValue: number = 0;
  maxValue: number = 0;

  paginationLength: number = 0;

  products: Product[] = [];
  productsOriginal: Product[] = [];
  productsPage: Product[] = [];

  pageCurrent: number = 1;

  productArrayFilter: number = 6;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
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

  onRangeChange() {
    this.maxValue = this.rangeValue;
  }

  onMaxChange() {
    this.rangeValue = this.maxValue;
  }

  resetpagination() {
    this.paginationLength = Math.ceil(this.products.length / 6);
    this.products = this.products.slice(0, 6);
  }

  filterPrice() {
    this.products = this.productsOriginal;
    this.products = this.products.filter((product: any) => product.price >= this.minValue && product.price <= this.maxValue);
    this.resetpagination();
  }

  clearFilter() {
    this.products = this.productsOriginal;
    this.rangeValue = 0;
    this.maxValue = 0;
    this.minValue = 0;
    this.resetpagination();
  }

  getProducts() {
    const categoryParam: {} = {
      category: this.categoryData.category,
      subCategory: this.categoryData.subCategory
    }

    this.productService.getAll(categoryParam).subscribe((data) => {
      this.products = data as Product[];
      this.productsOriginal = this.products;
      this.resetpagination();
    })
  }

  nextPage() {
    if(this.paginationLength <= 0 || this.pageCurrent > this.paginationLength) {
      return;
    }

    this.pageCurrent++;
    const p = Math.ceil((this.productsOriginal.length/6) * this.pageCurrent)
    this.products = this.productsOriginal.slice(p - 6, p);
  }

  pageClick(pageNumber: number) {
    this.pageCurrent = pageNumber + 1;
    const p = Math.ceil((this.productsOriginal.length/6) * this.pageCurrent)
    this.products = this.productsOriginal.slice(p - 6, p);
  }

  arrayFromNumber(num: number) {
    return Array.from({length: num}, (_, i) => i);
  }

  formatTitle(title: any): string {
    return title?.slice(0, 32) + '...';
  }
}
