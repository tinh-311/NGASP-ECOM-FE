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
}
