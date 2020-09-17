
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import data from '../../app/data.json';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent implements OnInit, AfterViewInit {
  user: any = {};
  loggedIn = false;

  constructor(private authService: SocialAuthService, private router: Router) { }
  @ViewChild(HeaderComponent) loginDetails;

  async signInWithGoogle(): Promise<any> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    localStorage.setItem('email', this.user.email);
    if (data.admin.some((val) => val.email === this.user.email && val.isAdmin === true)) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['staff']);
    }
  }


  ngAfterViewInit(): void {
    this.loginDetails = this.user;
  }
  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;

    });
  }

  signOut(): void {
    this.authService
      .signOut()
      .then(() => console.log('Logout success'))
      .catch((error) => console.log(error));
    this.router.navigate(['']);
    localStorage.removeItem('email');
  }
}
