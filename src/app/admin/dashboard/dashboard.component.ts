import { Component, OnInit } from '@angular/core';
import { NavItems } from '../constants/admin.constant';
import { UserService } from 'src/app/service/user.service';
import { CategoryService } from 'src/app/service/category.service';
import { combineLatest } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  readonly NAV_ITEM = NavItems;
  status: boolean = false;
  sessison: string = this.NAV_ITEM.Dashboard;
  title: string = this.NAV_ITEM.Dashboard;

  userTotal: any = 0;
  categoryTotal: any = 0;
  productTotal: any = 0;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    combineLatest([
      this.userService.getTotal(),
      this.categoryService.getTotal(),
      this.productService.getTotal(),
    ]).subscribe(([userTotal, categoryTotal, productTotal]) => {
      this.userTotal = userTotal;
      this.categoryTotal = categoryTotal;
      this.productTotal = productTotal;
    })
  }

  navigate(session: string) {
    switch(session) {
      case this.NAV_ITEM.ManageUsers: {
        this.onChangeSession(this.NAV_ITEM.ManageUsers);
        break;
      }
      case this.NAV_ITEM.ManageCategories: {
        this.onChangeSession(this.NAV_ITEM.ManageCategories);
        break;
      }
      case this.NAV_ITEM.ManageProducts: {
        this.onChangeSession(this.NAV_ITEM.ManageProducts);
        break;
      }
    }
  }

  addToggle() {
    this.status = !this.status;
  }

  onChangeSession(session: string): void {
    this.sessison = session;
    this.title = session;
    this.getData();
  }
}
