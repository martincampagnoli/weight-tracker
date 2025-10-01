import { createAction, props } from '@ngrx/store';
import { Entry } from 'src/app/models/Entry';

/**
 * Action representing a failure during data retrieval.
 */
export const getFailure = createAction(
  '[Default] GetFailure  Error',
  props<{ payload: { message: string } }>()
);

/**
 * Action to initiate retrieval of data.
 */
export const getData = createAction('[Entry] Get Entries');

/**
 * Action indicating successful retrieval of data.
 */
export const getDataSuccess = createAction(
  '[Entry] Get Entries Success',
  props<{ payload: Entry[] }>()
);

/**
 * Action to add a new entry.
 */
export const addEntrySuccess = createAction(
  '[Default] Add Entry Success',
  props<{ payload: { entry: Entry } }>()
);

/**
 * Action to delete a new entry.
 */
export const deleteEntrySuccess = createAction(
  '[Default] Delete Entry Success',
  props<{ payload: { id: number } }>()
);

/**
 * Action to reset the application state.
 */
export const resetAppState = createAction('[Default] Reset app state');
