import { Action } from '@ngrx/store';

// Error
export const GET_FAILURE = '[Default] GetFailure  Error';
export const GET_DATA = '[Default] GetData';
export const GET_DATA_SUCCESS = '[Default] GetData Success';
export const RESET_APP_STATE = '[Default] Reset app state';
export const UPDATE_DISPLAY_VALUE = '[Default] Update display value';

export class GetFailure implements Action {
  readonly type = GET_FAILURE;

  constructor(public payload: any) {}
}

export class GetData implements Action {
  readonly type = GET_DATA;

  constructor() {}
}

export class GetDataSuccess implements Action {
  readonly type = GET_DATA_SUCCESS;

  constructor(public payload: any) {}
}

export class ResetAppState implements Action {
  readonly type = RESET_APP_STATE;

  constructor(public payload: any) {}
}
export class UpdateDisplayValue implements Action {
  readonly type = UPDATE_DISPLAY_VALUE;

  constructor(public payload: any) {}
}

export type AppActions =
  | GetFailure
  | GetData
  | GetDataSuccess
  | ResetAppState
  | UpdateDisplayValue;
