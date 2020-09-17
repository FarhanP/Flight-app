import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { LoginServiceService } from './shared/services/login-service.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  canActivate() {
    if (this.loginService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
