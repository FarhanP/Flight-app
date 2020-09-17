import { Passengers } from 'src/app/models/passengers.modals';
import { AdminGuard } from './../../admin.guard';
import { Store, StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePassengerComponent } from './manage-passenger.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { reducers } from 'src/app/store';
import { Observable, of } from 'rxjs';

describe('ManagePassengerComponent', () => {
  let component: ManagePassengerComponent;
  let fixture: ComponentFixture<ManagePassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterModule.forRoot([]),
        AppModule,
        StoreModule.forRoot(reducers),
        FormsModule,
        HttpClientTestingModule],
      declarations: [ManagePassengerComponent],
      providers: [{
        provide: Store,
        useclass: PassengerMock
      }, AdminGuard]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePassengerComponent);
    component = fixture.componentInstance;
    fixture.debugElement.injector.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch passenger data', () => {
    expect(PassengerMock).toBeDefined(PassengerMock);
  });


});

export class PassengerMock {
  dispatch(): void { }
  select(): Observable<any> {
    return of({

      passengers: [
        {
          id: 1,
          name: 'Mad',
          seatType: 'Infant',
          seatNumber: '2A',
          flightNumber: '1001',
          contactNumber: '123232323232',
          address: 'Bangalore',
          passport: 'MAQ1001AQH',
          dateOfBirth: '',
          ancillaryServices: [
            'Extra space',
            'Luggage',
            'Extra baggage',
            'Extrz',
          ],
          specialMeals: true,
          shoppingItems: [
            'banana'
          ],
          checkedIn: false,
          infant: false,
          wheelChair: false
        }
      ]
    });
  }
}
