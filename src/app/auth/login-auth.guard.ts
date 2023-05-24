import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      let isLoggedIn = this.authService.isAuthenticated();
      if (isLoggedIn) {
        this.router.navigate(['']);
      }
      return true;
  }

}
