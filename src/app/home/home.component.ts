import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Catagory } from '../model/Catagory.model';
import { CategoryService } from '../service/category.service';
import { Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isProductSession: boolean = false;
  category: any;
  data: Catagory[]=[];

  products: Product[] = [];

  @Output() clickCategoryEvent = new EventEmitter<string>();

  constructor(
    private categoryList: CategoryService,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCatagory();
    this.getProducts();
  }

  navigateDetails(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { productId: product.id }
    };

    this.router.navigate(['/single'], navigationExtras);
  }

  getProducts() {
    const categoryParam: {} = {
      category: 'jewelry',
      subCategory: 'watches'
    }

    this.productService.getByCategory(categoryParam).subscribe((data) => {
      this.products = data as Product[];
    })
  }

  getCatagory() {
    this.categoryList.getCategoryList()
    .subscribe((data: Catagory[]) => {
      this.data = data;
    });
  }

  onCategoryChange(value: any) {
    this.category = value;
    this.isProductSession = true;
  }
}
