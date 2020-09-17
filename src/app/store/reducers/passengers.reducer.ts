import * as passengerActions from '../actions/passengers.actions';
import * as types from '../../models/passengers.action.types';
import { PassengerState } from '../../models/app.state';

export const initialState: PassengerState = {
  passengers: [],
};

export function PassengerReducer(
  state = initialState,
  action: passengerActions.Actions
): PassengerState {
  switch (action.type) {
    case types.LOAD_PASSENGERS_SUCCESS: {
      return { ...state, passengers: action.payload };
    }

    case types.ADD_PASSENGERS: {
      const passenger = action.payload;

      return { ...state, passengers: state.passengers.concat(passenger) };
    }

    case types.UPDATE_PASSENGER_SUCCESS: {
      return {
        ...state,
        passengers: state.passengers.map((p) => {
          if (p.id === action.payload.id) {
            return action.payload;
          } else {
            return p;
          }
        }),
      };
    }
    default:
      return state;
  }
}
