import { AppModule } from 'src/app/app.module';
import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { Store } from '@ngrx/store';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, AdminGuard]

    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
