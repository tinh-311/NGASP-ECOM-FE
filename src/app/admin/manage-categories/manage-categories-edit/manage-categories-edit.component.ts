import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageUserAddComponent } from '../../manage-users/manage-user-add/manage-user-add.component';

@Component({
  selector: 'app-manage-categories-edit',
  templateUrl: './manage-categories-edit.component.html',
  styleUrls: ['./manage-categories-edit.component.scss']
})
export class ManageCategoriesEditComponent {
  categories: any;

  editForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageCategoriesEditComponent>,
    private CategoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any},
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.fb.group({
      category: [this.categories?.category, Validators.required],
      subCategory: [this.categories?.subCategory, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
    });
  }

  edit() {
    const newProduct = {
      "id": this.categories?.id,
      'category': this.editForm.value.category,
      'subCategory': this.editForm.value.subCategory,
    }

    this.CategoryService.updateCategory(newProduct).subscribe(res => {
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
