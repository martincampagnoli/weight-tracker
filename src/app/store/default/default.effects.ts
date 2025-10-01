import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, switchMap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { getFailure, getData } from './default.actions';
import { getDataSuccess } from './default.actions';
import { Entry } from 'src/app/models/Entry';

/**
 * Effects for managing application actions related to data.
 */
@Injectable()
export class AppEffects {
  /**
   * Constructs the AppEffects.
   *
   * @param actions$ Observable stream of dispatched actions.
   * @param moviesService The service for fetching data.
   */
  constructor(private actions$: Actions, private dataService: DataService) {}

  /**
   * Effect to fetch data.
   */
  getData = createEffect(() =>
    this.actions$.pipe(
      ofType(getData),
      switchMap(() =>
        this.dataService.getData().pipe(
          switchMap((data: Entry[]) => [getDataSuccess({ payload: data })]),
          catchError((error) => of(getFailure({ payload: error })))
        )
      )
    )
  );
}
