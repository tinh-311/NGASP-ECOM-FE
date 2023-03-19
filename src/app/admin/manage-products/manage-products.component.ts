import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageProductsAddNewComponent } from './manage-products-add-new/manage-products-add-new.component';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { ManageProductsEditComponent } from './manage-products-edit/manage-products-edit.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {
  products: any = [];
  categories: any;
  currentPage: number = 1;

  constructor(
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private productService: ProductService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getCategory();
  }

  getProducts() {
    this.productService.get().subscribe((res: any) => {
      this.products = res;
    })
  }

  getCategory() {
    this.categoryService.getCategoryList().subscribe((res: any) => {
      this.categories = res;
      this.getProducts();
    })
  }

  getCategoryName(id: string) {
    let category = this.categories.filter((res: any) => res.id === id);
    return category[0]?.category || '';
  }

  formatDescription(des: string) {
    if(des?.length <= 100) {
      return des;
    }

    return des?.slice(0, 100) + ' ...';
  }

  formatTitle(title: string) {
    if(title?.length <= 50) {
      return title;
    }

    return title?.slice(0, 50) + ' ...';
  }

  add() {
    const dialogRef = this.dialog.open(ManageProductsAddNewComponent, {
      width: '700px',
      data: {
        categories: this.categories
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  update(item: any) {
    const dialogRef = this.dialog.open(ManageProductsEditComponent, {
      width: '700px',
      data: {
        categories: this.categories,
        product: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  deleteProduct(item: any) {
    this.productService.delete(item?.id).subscribe(res =>{
    }, (err) => {
      switch(err?.error?.text) {
        case 'deleted': {
          this.toastService.show(`Delete ${item?.title} successfully!`);
          this.getProducts();
          break;
        }
      }
    })
  }

  viewImage(url: string) {
    const dialogRef = this.dialog.open(ImageViewComponent, {
      width: '600px',
      height: '600px',
      data: {
        imageUrl: url
      }
    });
  }
}
