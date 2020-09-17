
import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  DashboardComponent
} from './dashboard.component';
import {
  RouterTestingModule
} from '@angular/router/testing';
import {
  RouterModule
} from '@angular/router';
import {
  AdminGuard
} from 'src/app/admin.guard';
import {
  Store,
  StoreModule
} from '@ngrx/store';
import {
  reducers
} from 'src/app/store';
import { async } from '@angular/core/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterModule.forRoot([]),
        StoreModule.forRoot(reducers),

      ],
      declarations: [DashboardComponent],
      providers: [{
        provide: Store
      }, AdminGuard]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // tslint:disable-next-line: variable-name
  it('should have data', async(() => {
    expect(component.getPassengers()).toBeUndefined();
  }));

});
