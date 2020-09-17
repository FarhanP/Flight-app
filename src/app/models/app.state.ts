import { Flights } from './flights.modals';
import { Passengers } from './passengers.modals';

export interface AppState {
  readonly flights: Flights[];
}

export interface PassengerState {
  readonly passengers: Passengers[];
}
