import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageUserAddComponent } from '../../manage-users/manage-user-add/manage-user-add.component';

@Component({
  selector: 'app-manage-products-edit',
  templateUrl: './manage-products-edit.component.html',
  styleUrls: ['./manage-products-edit.component.scss']
})
export class ManageProductsEditComponent {
  categories: any;
  product: any;

  editForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageProductsEditComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any, product: any },
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.product = this.data.product;
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.fb.group({
      title: [this.product?.title, Validators.required],
      description: [this.product?.description, Validators.required],
      price: [this.product?.price, [Validators.required]],
      imageUrl: [this.product?.imageName, [Validators.required]],
      category: [this.product?.productCategory?.id, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  edit() {
    const newProduct = {
      "id": this.product?.id,
      'title': this.editForm.value.title,
      'description': this.editForm.value.description,
      'categoryId': this.editForm.value.category,
      'offerId': 1,
      'price': this.editForm.value.price,
      'quantity': 0,
      'imageName': this.editForm.value.imageUrl
    }

    this.productService.update(newProduct).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "updated": {
          this.toastService.show(`Update successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
