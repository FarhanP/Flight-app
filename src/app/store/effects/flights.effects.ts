import { Injectable } from '@angular/core';
import { FlightService } from '../../shared/services/flights.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import * as types from '../../models/flights.action.types';
import * as flightActions from '../actions/flights.actions';
import { Flights } from '../../models/flights.modals';

@Injectable({
  providedIn: 'root',
})
export class FlightsEffects {
  constructor(
    private flightService: FlightService,
    private actions$: Actions
  ) { }

  @Effect() getFlights$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.LoadFlightsAction>(types.LOAD_FLIGHTS),
    mergeMap(() =>
      this.flightService
        .getFlights()
        .pipe(
          map((flights) => new flightActions.LoadFlightsSuccessAction(flights))
        )
    )
  );

  @Effect()
  addAncillaryServices$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.CreateAncillary>(types.CREATE_ANCILLARY),
    map((action: flightActions.CreateAncillary) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.addAncillaryServices(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.CreateAncillarySuccess(newFlight)
        ),
        catchError((err) => of(new flightActions.CreateAncillarySuccess(err)))
      )
    )
  );

  @Effect()
  UpdateAncillary$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.UpdateAncillary>(types.UPDATE_ANCILLARY),
    map((action: flightActions.UpdateAncillary) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.UpdateAncillary(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.UpdateAncillarySuccess(newFlight)
        ),
        catchError((err) => of(new flightActions.UpdateAncillarySuccess(err)))
      )
    )
  );

  @Effect()
  DeleteAncillary$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.DeleteAncillary>(types.DELETE_ANCILLARY),
    map((action: flightActions.DeleteAncillary) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.DeleteAncillary(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.DeleteAncillarySuccess(newFlight)
        ),
        catchError((err) => of(new flightActions.DeleteAncillarySuccess(err)))
      )
    )
  );

  @Effect()
  CreateSpecialMeals$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.CreateSpecialMeals>(types.CREATE_SPECIAL_MEALS),
    map((action: flightActions.CreateSpecialMeals) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.CreateSpecialMeals(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.CreateSpecialMealsSucess(newFlight)
        ),
        catchError((err) => of(new flightActions.CreateSpecialMealsSucess(err)))
      )
    )
  );

  @Effect()
  UpdateSpecialMeals$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.UpdateSpecialMeals>(types.UPDATE_SPECIAL_MEALS),

    map((action: flightActions.UpdateSpecialMeals) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.UpdateSpecialMeals(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.UpdateSpecialMealsSuccess(newFlight),
        ),
        catchError((err) =>
          of(new flightActions.UpdateSpecialMealsSuccess(err))
        )
      )
    )
  );

  @Effect()
  DeleteSpecialMeals$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.DeleteSpecialMeals>(types.DELETE_SPECIAL_MEALS),
    map((action: flightActions.DeleteSpecialMeals) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.DeleteSpecialMeals(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.DeleteSpecialMealsSuccess(newFlight)
        ),
        catchError((err) =>
          of(new flightActions.DeleteSpecialMealsSuccess(err))
        )
      )
    )
  );

  @Effect()
  CreateShoppingItems$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.CreateShoppingItems>(types.CREATE_SHOPPING_ITEMS),
    map((action: flightActions.CreateShoppingItems) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.CreateShoppingItems(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.CreateShoppingItemsSuccess(newFlight),
        ),
        catchError((err) =>
          of(new flightActions.CreateShoppingItemsSuccess(err))
        )
      )
    )
  );

  @Effect()
  UpdateShoppingItems$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.UpdateShoppingItems>(types.UPDATE_SHOPPING_ITEMS),

    map((action: flightActions.UpdateShoppingItems) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.UpdateShoppingItems(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.UpdateShoppingItemsSuccess(newFlight)
        ),
        catchError((err) =>
          of(new flightActions.UpdateShoppingItemsSuccess(err))
        )
      )
    )
  );

  @Effect()
  DeleteShoppingItems$: Observable<Action> = this.actions$.pipe(
    ofType<flightActions.DeleteShoppingItems>(types.DELETE_SHOPPING_ITEMS),
    map((action: flightActions.DeleteShoppingItems) => action.payload),
    mergeMap((flights: Flights) =>
      this.flightService.DeleteShoppingItems(flights).pipe(
        map(
          (newFlight: Flights) =>
            new flightActions.DeleteShoppingItemsSuccess(newFlight)
        ),
        catchError((err) =>
          of(new flightActions.DeleteShoppingItemsSuccess(err))
        )
      )
    )
  );
}
