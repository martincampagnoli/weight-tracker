import {
  Component,
  inject,
  OnInit,
  DestroyRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import * as reducers from 'src/app/store/default';
import { Entry } from 'src/app/models/Entry';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService } from 'src/app/services/data.service';

interface ChartDataset {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
  pointRadius: number;
}

interface WeightChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartOptions {
  responsive: boolean;
  plugins: {
    legend: { display: boolean };
    tooltip: { enabled: boolean };
  };
  scales: {
    x: { title: { display: boolean; text: string } };
    y: { title: { display: boolean; text: string } };
  };
}

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [CommonModule, ChartModule],
})
export class ViewProgressComponent implements OnInit {
  private readonly store = inject(Store<reducers.AppState>);
  private destroyRef = inject(DestroyRef);
  private dataService = inject(DataService);

  weightChartData: WeightChartData | null = null;
  weightChartOptions: ChartOptions;

  private readonly CHART_CONFIG = {
    BORDER_COLOR: '#42A5F5',
    TENSION: 0.3,
    POINT_RADIUS: 5,
    WEIGHT_LABEL: 'Weight (kg)',
    DATE_LABEL: 'Date',
  } as const;

  constructor() {
    this.weightChartOptions = this.createChartOptions();
  }

  ngOnInit(): void {
    this.loadWeightData();
  }

  private loadWeightData(): void {
    this.store
      .select(reducers.getDataState)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data.length > 0) {
          const sortedData = this.dataService.sortEntriesByDate(data);
          this.weightChartData = this.createChartData(sortedData);
        }
      });
  }

  private createChartData(entries: Entry[]): WeightChartData {
    return {
      labels: entries.map((entry) => entry.date),
      datasets: [
        {
          label: this.CHART_CONFIG.WEIGHT_LABEL,
          data: entries.map((entry) => entry.weight),
          fill: false,
          borderColor: this.CHART_CONFIG.BORDER_COLOR,
          tension: this.CHART_CONFIG.TENSION,
          pointRadius: this.CHART_CONFIG.POINT_RADIUS,
        },
      ],
    };
  }

  private createChartOptions(): ChartOptions {
    return {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: this.CHART_CONFIG.DATE_LABEL,
          },
        },
        y: {
          title: {
            display: true,
            text: this.CHART_CONFIG.WEIGHT_LABEL,
          },
        },
      },
    };
  }
}
