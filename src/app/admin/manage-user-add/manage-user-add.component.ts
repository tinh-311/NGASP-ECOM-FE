import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manage-user-add',
  templateUrl: './manage-user-add.component.html',
  styleUrls: ['./manage-user-add.component.scss']
})
export class ManageUserAddComponent implements OnInit{
  hide = true;

  registerForm: any = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ManageUserAddComponent>
  ) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
    const user: User = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      mobile: this.registerForm.value.phoneNumber,
      password: this.registerForm.value.password,
      role: 'user'
    }

    this.userService.register(user).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'insert fail': {
          this.toastService.show('Account already exists', 'err');
          break;
        }
        case 'inserted': {
          this.toastService.show('Addition successfully!');
          this.router.navigate(['admin']);
          break;
        }
      }
    })
  }
}
