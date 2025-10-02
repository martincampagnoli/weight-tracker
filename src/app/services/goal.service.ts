import { inject, Injectable } from '@angular/core';
import { Entry } from '../models/Entry';
import { DataService } from './data.service';

/**
 * Service for managing goal-related operations.
 */
@Injectable({
  providedIn: 'root',
})
export class GoalService {
  private dataService = inject(DataService);

  /**
   * Calculate the progress towards the goal based on entries and goal weight.
   * @param entries - The array of entries containing weight and date.
   * @param goalWeight - The target goal weight.
   * @returns The percentage of progress towards the goal, between 0 and 100.
   */
  calculateGoalProgress(entries: Array<Entry>, goalWeight: number): number {
    //if no entries or goalWeight is not defined, return 0
    if (!entries || entries.length === 0 || goalWeight == null) return 0;
    //sort entries by date ascending
    const sorted = this.dataService.sortEntriesByDate(entries);
    //get starting and current weight
    const startingWeight = sorted[0].weight;
    const currentWeight = sorted[sorted.length - 1].weight;
    //calculate total weight change needed and weight change so far
    const totalChangeNeeded = Math.abs(startingWeight - goalWeight);
    const changeSoFar = Math.abs(startingWeight - currentWeight);
    //calculate progress percentage
    if (totalChangeNeeded === 0) return 100;
    const progress = (changeSoFar / totalChangeNeeded) * 100;
    return Math.max(0, Math.min(100, progress));
  }
}
