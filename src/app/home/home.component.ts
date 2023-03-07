import { Component, OnInit } from '@angular/core';
import { Catagory } from '../model/Catagory.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Catagory[]=[];
  constructor(private categoryList: CategoryService) { }

  ngOnInit(): void {
    this.getCatagory();
  }

  getCatagory() {
    this.categoryList.getCategoryList()
    .subscribe((data: any) => {
      this.data = data;
    });
  }
}
