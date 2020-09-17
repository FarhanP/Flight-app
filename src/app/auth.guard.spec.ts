import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AppModule } from './app.module';
import { Store } from '@ngrx/store';
import { AdminGuard } from './admin.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, AuthGuard]

    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
