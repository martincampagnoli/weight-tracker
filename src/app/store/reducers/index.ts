import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as actions from '../actions';
import { Post } from 'src/app/Models/Post';

// App state
export interface AppState {
  loading: boolean;
  data: Array<Post>;
}

const defaultAppState: AppState = {
  loading: false,
  data: [],
};

// Reducer
export function appReducer(
  state = defaultAppState,
  action: actions.AppActions
): AppState {
  switch (action.type) {
    case actions.RESET_APP_STATE:
      return (state = defaultAppState);

    case actions.GET_DATA:
      return (state = {
        ...state,
        loading: true,
      });

    case actions.GET_FAILURE:
      return (state = {
        ...state,
        loading: false,
      });

    case actions.GET_DATA_SUCCESS:
      return (state = {
        ...state,
        loading: false,
        data: action.payload.map((e: Post) => ({ ...e, displayKey: 'TITLE' })),
      });

    case actions.UPDATE_DISPLAY_VALUE:
      const updatedData = [
        ...state.data.map((e) =>
          e.id === action.payload.post.id
            ? { ...e, displayKey: action.payload.displayKey }
            : e
        ),
      ];
      return (state = {
        ...state,
        loading: false,
        data: updatedData,
      });

    default: {
      return state;
    }
  }
}

export const selectAppState = createFeatureSelector<AppState>('app');

//Selectors
export const getAppState = createSelector(
  selectAppState,
  (state: AppState) => state
);

export const getData = createSelector(selectAppState, (state: AppState) => {
  return state.data;
});
