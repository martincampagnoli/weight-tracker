import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { getDataSuccess, resetAppState } from './default.actions';

/**
 * The structure of the application state.
 */
export interface AppState {
  loading: boolean;
  data: any[];
}

/**
 * The default initial state for the application.
 */
const initialState: AppState = {
  loading: false,
  data: [],
};

/**
 * Reducer function that handles state changes based on dispatched actions.
 *
 * @param state The current state.
 * @param action The dispatched action.
 * @returns The new state after applying the action.
 */
const reducer = createReducer(
  initialState,
  on(resetAppState, (initialState) => ({
    ...initialState,
  })),
  on(getDataSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      data: payload,
    };
  })
);

/**
 * The reducer function that handles various app-related actions to modify the state.
 *
 * @param state The current state.
 * @param action The dispatched action.
 * @returns The new state after applying the action.
 */
export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}

/**
 * Selects the 'app' feature state.
 */
export const selectAppState = createFeatureSelector<AppState>('app');

/**
 * Selectors for various parts of the application state.
 */
export const getAppState = createSelector(
  selectAppState,
  (state: AppState) => state
);

export const getDataState = createSelector(
  selectAppState,
  (state: AppState) => {
    return state.data;
  }
);
