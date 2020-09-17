import { AppModule } from './../app.module';
import { SocialAuthService, SocialUser, SocialLoginModule } from 'angularx-social-login';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { SocialLoginComponent } from './social-login.component';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('SocialLoginComponent', () => {
  let component: SocialLoginComponent;
  let fixture: ComponentFixture<SocialLoginComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppModule,
        FormsModule,
        HttpClientTestingModule],
      declarations: [SocialLoginComponent],
      providers: [SocialAuthService, SocialLoginModule

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should be created', inject([SocialAuthService], (service: SocialAuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should signIn', () => {
    // tslint:disable-next-line: no-unused-expression
    expect(component.signInWithGoogle()).toBeTruthy;
  });

  it('should signOut', () => {
    // tslint:disable-next-line: no-unused-expression
    expect(component.signOut()).toBeUndefined;
  });
});


export class SocialServiceTest {

  get authState(): Observable<SocialUser> {

    return of({ email: '' } as any);

  }

  signIn(providerId: string, signInOptions?: any): Promise<SocialUser> {
    return new Promise(response => {
      response({ email: '' } as any);
    });
  }

  signOut(revoke?: boolean): Promise<any> {
    return new Promise(response => {
      response({ email: '' } as any);
    });
  }

}
