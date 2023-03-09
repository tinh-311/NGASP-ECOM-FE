import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Catagory } from '../model/Catagory.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isProductSession: boolean = false;
  category: any;
  data: Catagory[]=[];

  @Output() clickCategoryEvent = new EventEmitter<string>();

  constructor(private categoryList: CategoryService) { }

  ngOnInit(): void {
    this.getCatagory();
  }

  getCatagory() {
    this.categoryList.getCategoryList()
    .subscribe((data: Catagory[]) => {
      this.data = data;
    });
  }

  onCategoryChange(value: any) {
    this.category = value;
    console.log('🌷🌷🌷 ~ this.category: ', this.category)
    this.isProductSession = true;
  }
}
