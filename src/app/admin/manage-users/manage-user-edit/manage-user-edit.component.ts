import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { ManageUserAddComponent } from '../manage-user-add/manage-user-add.component';

@Component({
  selector: 'app-manage-user-edit',
  templateUrl: './manage-user-edit.component.html',
  styleUrls: ['./manage-user-edit.component.scss']
})
export class ManageUserEditComponent implements OnInit {
  user: any;
  roleUser: any = ['admin', 'user'];

  editForm: any;
  ngOnInit(): void {
    this.user = this.data.user;
    this.buildForm();
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageUserAddComponent>,
    private usertService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    ) {}

  buildForm() {
    this.editForm = this.fb.group({
        firstName: [this.user?.firstName , Validators.required],
        lastName: [this.user?.lastName],
        email: [this.user?.email, [Validators.required]],
        address: [this.user?.address, [Validators.required]],
        phoneNumber: [this.user?.mobile, [Validators.required]],
        password: [this.user?.password, [Validators.required]],
        imageUrl: [this.user?.userAvt],
        role: [this.user?.role, [Validators.required]],
    });
  }


  onEdit() {
    const newUser = {
      "id": this.user?.id,
      'firstName': this.editForm.value.firstName,
      'lastName': this.editForm.value.lastName,
      'email': this.editForm.value.email,
      'address': this.editForm.value.address,
      'mobile': this.editForm.value.phoneNumber,
      'password': this.editForm.value.password,
      'userAvt': this.editForm.value.imageUrl,
      'role': this.editForm.value.role
    }

    this.usertService.editUser(newUser).subscribe(res => {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      imageUrl: [''],
      role: ['', [Validators.required]],
    });
  }
}
