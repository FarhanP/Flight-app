import { ActionReducerMap } from '@ngrx/store';
import { FlightReducer } from './reducers/flights.reducer';
import { PassengerReducer } from './reducers/passengers.reducer';
import { AppState, PassengerState } from '../models/app.state';

interface ApplicationState {
  flightState: AppState;
  passengerState: PassengerState;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  flightState: FlightReducer,
  passengerState: PassengerReducer,
};

