import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @Input() category: any;

  constructor(
    private route: ActivatedRoute
  ){ }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
