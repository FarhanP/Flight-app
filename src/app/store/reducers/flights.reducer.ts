import * as flightActions from '../actions/flights.actions';
import * as types from '../../models/flights.action.types';
import { AppState } from '../../models/app.state';

export const initialState: AppState = {
  flights: [],
};

export function FlightReducer(
  state = initialState,
  action: flightActions.Actions
): AppState {
  switch (action.type) {
    case types.LOAD_FLIGHTS_SUCCESS: {
      return { ...state, flights: action.payload };
    }

    case types.ADD_ANCILLARY: {
      const flights = action.payload;
      return { ...state, flights: state.flights.concat(flights) };
    }

    case types.UPDATE_ANCILLARY_SUCCESS: {
      return {
        ...state,
        flights: state.flights.map((f) => {
          if (f.id === action.payload.id) {
            return action.payload;
          } else {
            return f;
          }
        }),
      };
    }
    case types.DELETE_ANCILLARY_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter(
          (flightData) => flightData.id !== action.payload.id
        ),
      };

    case types.ADD_SPECIAL_MEALS: {
      const flights = action.payload;
      return { ...state, flights: state.flights.concat(flights) };
    }

    case types.UPDATE_SPECIAL_MEALS_SUCCESS: {
      return {
        ...state,
        flights: state.flights.map((f) => {
          if (f.id === action.payload.id) {
            return action.payload;
          } else {
            return f;
          }
        }),
      };
    }
    case types.DELETE_SPECIAL_MEALS_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter(
          (flightData) => flightData.id !== action.payload.id
        ),
      };

    case types.ADD_SHOPPING_ITEMS: {
      const flights = action.payload;
      return { ...state, flights: state.flights.concat(flights) };
    }

    case types.UPDATE_SHOPPING_ITEMS_SUCCESS: {
      return {
        ...state,
        flights: state.flights.map((f) => {
          if (f.id === action.payload.id) {
            return action.payload;
          } else {
            return f;
          }
        }),
      };
    }
    case types.DELETE_SHOPPING_ITEMS_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter(
          (flightData) => flightData.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}
