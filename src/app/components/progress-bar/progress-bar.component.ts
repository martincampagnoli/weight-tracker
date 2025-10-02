import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { GoalService } from 'src/app/services/goal.service';
import * as reducers from 'src/app/store/default';

/**
 * Component representing a progress bar.
 */
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatProgressBar, CommonModule],
  standalone: true,
  host: { class: 'w-75' },
})
export class ProgressBarComponent {
  private goalService = inject(GoalService);
  store = inject(Store);

  private entries$ = this.store.select(reducers.getDataState);
  protected goal$ = this.store.select(reducers.getTargetWeight);

  protected progress = toSignal(
    combineLatest([this.entries$, this.goal$]).pipe(
      map(([entries, goal]) => {
        if (!entries || !goal) return 0;
        return this.goalService.calculateGoalProgress(entries, goal);
      })
    )
  );
}
