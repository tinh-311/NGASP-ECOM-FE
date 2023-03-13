import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../service/login.service';
import { User } from './../model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  email: string = '';
  password: string = '';
  remember: any;

  loginForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {}

  register() {
    this.router.navigate(['/register']);
  }

  check_Login() {
    this.router.navigate(['/home']);
    // const user: User = {
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password
    // }

    // this.loginService.login(user).subscribe(token => {
    //   console.log('🌷🌷🌷 ~ token: ', token)
    // })
  }

}
