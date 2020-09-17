import { Action } from '@ngrx/store';
import * as types from '../../models/flights.action.types';
import { Flights } from '../../models/flights.modals';

export class LoadFlightsAction implements Action {
  readonly type = types.LOAD_FLIGHTS;
}

export class LoadFlightsSuccessAction implements Action {
  readonly type = types.LOAD_FLIGHTS_SUCCESS;
  constructor(public payload: Flights[]) { }
}

export class CreateAncillary implements Action {
  readonly type = types.CREATE_ANCILLARY;
  constructor(public payload: Flights) { }
}

export class CreateAncillarySuccess implements Action {
  readonly type = types.ADD_ANCILLARY;
  constructor(public payload: Flights) { }
}

export class UpdateAncillary implements Action {
  readonly type = types.UPDATE_ANCILLARY;
  constructor(public payload: Flights) { }
}

export class UpdateAncillarySuccess implements Action {
  readonly type = types.UPDATE_ANCILLARY_SUCCESS;
  constructor(public payload: Flights) { }
}

export class DeleteAncillary implements Action {
  readonly type = types.DELETE_ANCILLARY;
  constructor(public payload: Flights) { }
}

export class DeleteAncillarySuccess implements Action {
  readonly type = types.DELETE_ANCILLARY_SUCCESS;
  constructor(public payload: Flights) { }
}

export class CreateSpecialMeals implements Action {
  readonly type = types.CREATE_SPECIAL_MEALS;
  constructor(public payload: Flights) { }
}

export class CreateSpecialMealsSucess implements Action {
  readonly type = types.ADD_SPECIAL_MEALS;
  constructor(public payload: Flights) { }
}

export class UpdateSpecialMeals implements Action {
  readonly type = types.UPDATE_SPECIAL_MEALS;
  constructor(public payload: Flights) { }
}

export class UpdateSpecialMealsSuccess implements Action {
  readonly type = types.UPDATE_SPECIAL_MEALS_SUCCESS;
  constructor(public payload: Flights) { }
}

export class DeleteSpecialMeals implements Action {
  readonly type = types.DELETE_SPECIAL_MEALS;
  constructor(public payload: Flights) { }
}

export class DeleteSpecialMealsSuccess implements Action {
  readonly type = types.DELETE_SPECIAL_MEALS_SUCCESS;
  constructor(public payload: Flights) { }
}

export class CreateShoppingItems implements Action {
  readonly type = types.CREATE_SHOPPING_ITEMS;
  constructor(public payload: Flights) { }
}

export class CreateShoppingItemsSuccess implements Action {
  readonly type = types.ADD_SHOPPING_ITEMS;
  constructor(public payload: Flights) { }
}

export class UpdateShoppingItems implements Action {
  readonly type = types.UPDATE_SHOPPING_ITEMS;
  constructor(public payload: Flights) { }
}

export class UpdateShoppingItemsSuccess implements Action {
  readonly type = types.UPDATE_SHOPPING_ITEMS_SUCCESS;
  constructor(public payload: Flights) { }
}

export class DeleteShoppingItems implements Action {
  readonly type = types.DELETE_SHOPPING_ITEMS;
  constructor(public payload: Flights) { }
}

export class DeleteShoppingItemsSuccess implements Action {
  readonly type = types.DELETE_SHOPPING_ITEMS_SUCCESS;
  constructor(public payload: Flights) { }
}

export type Actions =
  | LoadFlightsAction
  | LoadFlightsSuccessAction
  | CreateAncillary
  | CreateAncillarySuccess
  | UpdateAncillary
  | UpdateAncillarySuccess
  | DeleteAncillary
  | DeleteAncillarySuccess
  | CreateSpecialMeals
  | CreateSpecialMealsSucess
  | UpdateSpecialMeals
  | UpdateSpecialMealsSuccess
  | DeleteSpecialMeals
  | DeleteSpecialMealsSuccess
  | CreateShoppingItems
  | CreateShoppingItemsSuccess
  | UpdateShoppingItems
  | UpdateShoppingItemsSuccess
  | DeleteShoppingItems
  | DeleteShoppingItemsSuccess;
