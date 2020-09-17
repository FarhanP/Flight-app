import { Action } from '@ngrx/store';
import * as types from '../../models/passengers.action.types';
import { Passengers } from '../../models/passengers.modals';

export class LoadPassengersAction implements Action {
  readonly type = types.LOAD_PASSENGERS;
}

export class LoadPassengersSuccessAction implements Action {
  readonly type = types.LOAD_PASSENGERS_SUCCESS;
  constructor(public payload: Passengers[]) { }
}

export class CreatePassenger implements Action {
  readonly type = types.CREATE_PASSENGER;
  constructor(public payload: Passengers) { }
}

export class AddPassengerAction implements Action {
  readonly type = types.ADD_PASSENGERS;
  constructor(public payload: Passengers) { }
}

export class UpdatePassenger implements Action {
  readonly type = types.UPDATE_PASSENGER;
  constructor(public payload: Passengers) { }
}
export class UpdatPassengerSuccess implements Action {
  readonly type = types.UPDATE_PASSENGER_SUCCESS;

  constructor(public payload: Passengers) { }
}

export type Actions =
  | LoadPassengersAction
  | LoadPassengersSuccessAction
  | CreatePassenger
  | AddPassengerAction
  | UpdatePassenger
  | UpdatPassengerSuccess;
