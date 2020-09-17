import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
import {
  Component,
  Directive,
  OnInit
} from '@angular/core';
import {
  Flights
} from '../../models/flights.modals';
import {
  Passengers
} from '../../models/passengers.modals';
import {
  Store
} from '@ngrx/store';
import {
  AppState,
  PassengerState
} from '../../models/app.state';
import * as FlightActions from '../../store/actions/flights.actions';
import * as PassengerActions from '../../store/actions/passengers.actions';
import {
  Observable
} from 'rxjs';
import { HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  flights$: Observable<AppState>;
  passengers$: Observable<PassengerState>;
  flights: Flights[];
  passengers: Passengers[];
  queryParamsStatus = '';

  displayedColumns: string[] = [
    'Flight-Id',
    'FlightCode',
    'departureStation',
    'arrivalStation',
    'Duration',
    'Services',
    'Passengers',
  ];

  constructor(
    private router: Router,
    private location: Location,
    private store: Store<any>,
    private activatedRoute: ActivatedRoute
  ) {
    this.flights$ = this.store.select('flightState');
    this.passengers$ = this.store.select('passengerState');
  }

  ngOnInit(): void {
    this.getFlights();
    this.getPassengers();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamsStatus = params.id;

    });

    this.flights$.subscribe(
      (state: AppState) => (this.flights = state.flights)
    );
    this.passengers$.subscribe(
      (state: PassengerState) => (this.passengers = state.passengers)
    );
  }

  getFlights(): void {
    this.store.dispatch(new FlightActions.LoadFlightsAction());
  }

  getPassengers(): void {
    this.store.dispatch(new PassengerActions.LoadPassengersAction());
  }
}
