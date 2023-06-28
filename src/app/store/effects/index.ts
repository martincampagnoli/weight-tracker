import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, catchError, share, switchMap } from 'rxjs';

import * as actions from '../actions';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}
  // Default effect
  $getData = createEffect(() =>
    this.actions$.pipe(ofType(actions.GET_DATA)).pipe(
      switchMap(() =>
        this.dataService.getData().pipe(
          switchMap((data) => [new actions.GetDataSuccess(data)]),
          catchError((error) =>
            of(
              new actions.GetFailure({
                error,
              })
            )
          )
        )
      )
    )
  );
}
