import { TestBed } from '@angular/core/testing';

import { FlightService } from './flights.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { reducers } from 'src/app/store';

describe('Flight.Service', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterModule.forRoot([]),
        AppModule,
        StoreModule.forRoot(reducers),
        FormsModule,
        HttpClientTestingModule],
    });

    service = TestBed.inject(FlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
