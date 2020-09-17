import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightServicesComponent } from './manage-flight-services.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminGuard } from 'src/app/admin.guard';
import { reducers } from 'src/app/store';
import { RouterModule } from '@angular/router';

describe('ManageFlightServicesComponent', () => {
  let component: ManageFlightServicesComponent;
  let fixture: ComponentFixture<ManageFlightServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterModule.forRoot([]),
        AppModule,
        FormsModule,
        StoreModule.forRoot(reducers),
        HttpClientTestingModule],
      declarations: [ManageFlightServicesComponent],
      providers: [{
        provide: Store
      }, AdminGuard]


    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFlightServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
