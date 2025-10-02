import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  createEntry,
  deleteEntry,
  getDataSuccess,
  resetAppState,
  resetGoal,
  setGoal,
} from './default.actions';
import { Entry } from 'src/app/models/Entry';

/**
 * The structure of the application state.
 */
export interface AppState {
  loading: boolean;
  data: Entry[];
  nextId: number;
  targetWeight?: number;
}

/**
 * The default initial state for the application.
 */
const initialState: AppState = {
  loading: false,
  data: [],
  nextId: 1,
  targetWeight: undefined,
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
    const maxId =
      payload.length > 0 ? Math.max(...payload.map((entry) => entry.id)) : 0;
    return {
      ...state,
      loading: false,
      data: payload,
      nextId: maxId + 1,
    };
  }),
  on(deleteEntry, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      data: state.data.filter((entry) => entry.id !== payload.id),
    };
  }),
  on(createEntry, (state, { payload }) => {
    const newEntry: Entry = {
      id: state.nextId,
      weight: payload.weight,
      date: payload.date,
      description: payload.description,
    };
    return {
      ...state,
      loading: false,
      data: [newEntry, ...state.data],
      nextId: state.nextId + 1,
    };
  }),
  on(setGoal, (state, { payload }) => {
    const newGoal = payload.targetWeight;
    return {
      ...state,
      targetWeight: newGoal,
    };
  }),
  on(resetGoal, (state) => {
    return {
      ...state,
      targetWeight: undefined,
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
  (state: AppState) => state.data
);

/**
 * Selector to get the next available ID for new entries.
 */
export const getNextEntryId = createSelector(
  selectAppState,
  (state: AppState): number => state.nextId
);

/**
 * Selector to get the target weight.
 */
export const getTargetWeight = createSelector(
  selectAppState,
  (state: AppState) => state.targetWeight
);
