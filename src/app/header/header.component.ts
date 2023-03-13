import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../service/toast.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;

  constructor(
    private router: Router,
    private toastService: ToastService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    this.currentUser = jwt_decode(token);
    console.log('🌷🌷🌷 ~ this.currentUser: ', this.currentUser)
  }

  reloadCurrentRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
    });
  }

  logOut() {
    this.cookieService.deleteAll();
    this.reloadCurrentRoute();
    this.toastService.show('Logout successfully!');
  }

  login() {
    this.router.navigate(['/login']);
  }
}
