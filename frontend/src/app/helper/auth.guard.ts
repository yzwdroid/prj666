import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

    const user = localStorage.getItem('user');
    if (user) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['sign-in'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
