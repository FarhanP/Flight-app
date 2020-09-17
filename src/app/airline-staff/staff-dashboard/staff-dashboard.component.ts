import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PassengerState, AppState } from 'src/app/models/app.state';
import { Flights } from 'src/app/models/flights.modals';
import { Passengers } from 'src/app/models/passengers.modals';
import * as FlightActions from '../../store/actions/flights.actions';
import * as PassengerActions from '../../store/actions/passengers.actions';
import { MatDialog } from '@angular/material/dialog';
import { trigger, transition, query, style, animate, stagger } from '@angular/animations';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss'],
  animations: [
    trigger('photosAnimation', [
      transition('* => *', [
        query('img', style({ transform: 'translateX(-100%)' })),
        query('img',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateX(0)' }))
          ]))
      ])
    ])
  ]
})
export class StaffDashboardComponent implements OnInit {

  flights$: Observable<AppState>;
  passengers$: Observable<PassengerState>;
  flights: Flights[];
  passengers: Passengers[];
  queryParamsStatus = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private router: Router,
    public dialog: MatDialog
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

  getFlights(): any {
    this.store.dispatch(new FlightActions.LoadFlightsAction());

  }

  getPassengers(): any {
    this.store.dispatch(new PassengerActions.LoadPassengersAction());
  }
}
