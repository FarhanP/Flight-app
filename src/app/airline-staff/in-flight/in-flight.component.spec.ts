import { AuthGuard } from './../../auth.guard';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InFlightComponent } from './in-flight.component';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { reducers } from 'src/app/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InFlightComponent', () => {
  let component: InFlightComponent;
  let fixture: ComponentFixture<InFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),
        AppModule,
      StoreModule.forRoot(reducers),
        FormsModule,
        HttpClientTestingModule],
      declarations: [InFlightComponent],

      providers: [{
        provide: Store
      }, AuthGuard]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
