import { AuthGuard } from './../../auth.guard';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInComponent } from './check-in.component';
import { AppModule } from 'src/app/app.module';
import { Store } from '@ngrx/store';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: Store
      }, AuthGuard],

      declarations: [CheckInComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
