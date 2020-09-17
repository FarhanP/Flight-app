import { Injectable } from '@angular/core';
import { PassengerService } from '../../shared/services/passengers.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as types from '../../models/passengers.action.types';
import * as passengerActions from '../actions/passengers.actions';
import { Passengers } from '../../models/passengers.modals';

@Injectable({
  providedIn: 'root',
})
export class PassengersEffects {
  constructor(
    private passengerService: PassengerService,
    private actions$: Actions
  ) {}

  @Effect() loadPassengers$: Observable<Action> = this.actions$.pipe(
    ofType<passengerActions.LoadPassengersAction>(types.LOAD_PASSENGERS),
    mergeMap(() =>
      this.passengerService
        .getPassengers()
        .pipe(
          map(
            (passengers) =>
              new passengerActions.LoadPassengersSuccessAction(passengers)
          )
        )
    )
  );

  @Effect()
  addPassenger$: Observable<Action> = this.actions$.pipe(
    ofType<passengerActions.CreatePassenger>(types.CREATE_PASSENGER),
    map((action: passengerActions.CreatePassenger) => action.payload),
    mergeMap((passenger: Passengers) =>
      this.passengerService.addPassengers(passenger).pipe(
        map(
          (newPassenger: Passengers) =>
            new passengerActions.AddPassengerAction(newPassenger)
        ),
        catchError((err) => of(new passengerActions.AddPassengerAction(err)))
      )
    )
  );

  @Effect()
  updatePassenger$: Observable<Action> = this.actions$.pipe(
    ofType<passengerActions.UpdatePassenger>(types.UPDATE_PASSENGER),
    map((action: passengerActions.UpdatePassenger) => action.payload),
    mergeMap((passenger: Passengers) =>
      this.passengerService.updatePassengers(passenger).pipe(
        map(
          (newPassenger: Passengers) =>
            new passengerActions.UpdatPassengerSuccess(newPassenger)
        ),
        catchError((err) => of(new passengerActions.UpdatPassengerSuccess(err)))
      )
    )
  );
}
