import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { User } from '../model/User.model';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;

  registerForm: any = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, {
    validator: this.passwordMatchValidator
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
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
          this.toastService.show('Email already exists', 'err');
          break;
        }
        case 'inserted': {
          this.toastService.show('Register successfully!');
          this.router.navigate(['/login']);
          break;
        }
      }
    })
  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }

  return() {
    this.router.navigate(['/login']);
  }
}
