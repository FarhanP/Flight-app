import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Flights } from 'src/app/models/flights.modals';
import { Passengers } from 'src/app/models/passengers.modals';
import { AppState, PassengerState } from 'src/app/models/app.state';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor() {}
}
