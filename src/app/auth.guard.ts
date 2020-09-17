import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Route,
  Router,
} from '@angular/router';
import { LoginServiceService } from './shared/services/login-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) { }


  canActivate(): any {
    if (this.loginService.loggedIn() === false && localStorage.getItem('email') !== null) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
