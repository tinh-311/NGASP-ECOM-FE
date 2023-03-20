import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { ManageUserAddComponent } from '../../manage-users/manage-user-add/manage-user-add.component';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-manage-products-add-new',
  templateUrl: './manage-products-add-new.component.html',
  styleUrls: ['./manage-products-add-new.component.scss']
})
export class ManageProductsAddNewComponent {
  categories: any;

  addNewForm: any = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageProductsAddNewComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any },
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
  }

  onChangeCategory() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  add() {
    const newProduct = {
      'title': this.addNewForm.value.title,
      'description': this.addNewForm.value.description,
      'categoryId': this.addNewForm.value.category,
      'offerId': 1,
      'price': this.addNewForm.value.price,
      'quantity': 0,
      'imageName': this.addNewForm.value.imageUrl
    }

    this.productService.add(newProduct).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${newProduct?.title} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
