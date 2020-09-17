import { AuthGuard } from './../../auth.guard';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashboardComponent } from './staff-dashboard.component';
import { AdminGuard } from 'src/app/admin.guard';
import { Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, AuthGuard],

      declarations: [StaffDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashboardComponent);
    component = fixture.componentInstance ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
