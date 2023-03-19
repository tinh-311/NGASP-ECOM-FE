import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.cookieService.get('token');

    let role, currentUser: any;
    if(!token) {
      this.router.navigate(['/login']);
      return false;
    }

    currentUser = jwt_decode(token);
    role = currentUser?.role;

    if(!currentUser || role !== 'admin') {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
