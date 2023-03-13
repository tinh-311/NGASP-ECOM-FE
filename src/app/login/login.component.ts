import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { User } from './../model/User.model';
import { ToastService } from '../service/toast.service';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  tokenString: string = '';
  email: string = '';
  password: string = '';
  remember: any;

  loginData: any;

  loginForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [true]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    const remember = this.cookieService.get('remember');
    if(remember && token) {
      this.router.navigate(['/home']);
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

  check_Login() {
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.loginService.login(user).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case 'invalid': {
          this.toastService.show('User name or password incorrect', 'err');
          break;
        }
        default: {
          this.tokenString = err?.error?.text;
          if(this.loginForm.value.remember) {
            this.cookieService.set('remember', 'true');
          }
          this.cookieService.set('token', this.tokenString);
          this.toastService.show('Login successfully!');
          this.router.navigate(['/home']);
          break;
        }
      }
    })
  }

}
