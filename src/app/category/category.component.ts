import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Catagory } from '../model/Catagory.model';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Output() clickCategoryEvent = new EventEmitter<string>();

  data: Catagory[]=[];
  constructor(
    private categoryList: CategoryService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.getCatagory();
  }

  getCatagory() {
    this.categoryList.getCategoryList()
    .subscribe((data: Catagory[]) => {
      this.data = data;
    });
  }

  onClickCategory(category: any) {
    this.clickCategoryEvent.emit(category);

    const navigationExtras: NavigationExtras = {
      queryParams: { categoryId: category.id }
    };

    this.router.navigate(['/shop'], navigationExtras);
  }
}
