import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { signal } from '@angular/core';
import { of } from 'rxjs';

import { ViewProgressComponent } from './view-progress.component';
import { Entry } from 'src/app/models/Entry';
import * as reducers from 'src/app/store/default';

describe('ViewProgressComponent', () => {
  let component: ViewProgressComponent;
  let fixture: ComponentFixture<ViewProgressComponent>;
  let store: MockStore;
  let mockDialogRef: jest.Mocked<MatDialogRef<ViewProgressComponent>>;

  const mockEntries: Entry[] = [
    { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
    { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    { id: 3, weight: 65, date: '01-02-2024', description: 'Goal reached' },
  ];

  const initialState = {
    data: [],
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn().mockReturnValue(of(true)),
      beforeClosed: jest.fn().mockReturnValue(of(true)),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ViewProgressComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ViewProgressComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dialogRef', signal(mockDialogRef));
  });

  afterEach(() => {
    fixture.destroy();
    jest.clearAllMocks();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('Initialization', () => {
    it('should initialize chart options on construction', () => {
      expect(component.weightChartOptions).toBeDefined();
      expect(component.weightChartOptions.responsive).toBe(true);
      expect(component.weightChartOptions.plugins.legend.display).toBe(true);
      expect(component.weightChartOptions.plugins.tooltip.enabled).toBe(true);
    });

    it('should have null chart data initially', () => {
      expect(component.weightChartData).toBeNull();
    });

    it('should have CHART_CONFIG constants defined', () => {
      expect((component as any).CHART_CONFIG).toBeDefined();
      expect((component as any).CHART_CONFIG.BORDER_COLOR).toBe('#42A5F5');
      expect((component as any).CHART_CONFIG.TENSION).toBe(0.3);
      expect((component as any).CHART_CONFIG.POINT_RADIUS).toBe(5);
      expect((component as any).CHART_CONFIG.WEIGHT_LABEL).toBe('Weight (kg)');
      expect((component as any).CHART_CONFIG.DATE_LABEL).toBe('Date');
    });
  });

  describe('Data Loading', () => {
    beforeEach(() => {
      store.overrideSelector(reducers.getDataState, mockEntries);
      fixture.detectChanges();
    });

    it('should load and sort data from store', () => {
      expect(component.weightChartData).not.toBeNull();
      expect(component.weightChartData!.labels).toEqual([
        '01-01-2024',
        '15-01-2024',
        '01-02-2024',
      ]);
      expect(component.weightChartData!.datasets[0].data).toEqual([70, 68, 65]);
    });

    it('should create proper chart data structure', () => {
      expect(component.weightChartData!.datasets).toHaveLength(1);
      expect(component.weightChartData!.datasets[0].label).toBe('Weight (kg)');
      expect(component.weightChartData!.datasets[0].fill).toBe(false);
      expect(component.weightChartData!.datasets[0].borderColor).toBe(
        '#42A5F5'
      );
      expect(component.weightChartData!.datasets[0].tension).toBe(0.3);
      expect(component.weightChartData!.datasets[0].pointRadius).toBe(5);
    });
  });

  describe('Date Sorting', () => {
    it('should sort entries by date chronologically', () => {
      const unsortedEntries: Entry[] = [
        { id: 3, weight: 65, date: '01-02-2024', description: 'Latest' },
        { id: 1, weight: 70, date: '01-01-2024', description: 'Earliest' },
        { id: 2, weight: 68, date: '15-01-2024', description: 'Middle' },
      ];

      store.overrideSelector(reducers.getDataState, unsortedEntries);
      fixture.detectChanges();

      expect(component.weightChartData!.labels).toEqual([
        '01-01-2024',
        '15-01-2024',
        '01-02-2024',
      ]);
    });

    it('should handle different date formats correctly', () => {
      const mixedDateEntries: Entry[] = [
        { id: 1, weight: 70, date: '31-12-2023', description: 'New Year' },
        { id: 2, weight: 68, date: '01-01-2024', description: 'New Year+1' },
      ];

      store.overrideSelector(reducers.getDataState, mixedDateEntries);
      fixture.detectChanges();

      expect(component.weightChartData!.labels).toEqual([
        '31-12-2023',
        '01-01-2024',
      ]);
    });
  });

  describe('Private Methods', () => {
    it('should parseDate correctly', () => {
      const parseDate = (component as any).parseDate.bind(component);
      const date = parseDate('15-03-2024');

      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(2);
      expect(date.getDate()).toBe(15);
    });

    it('should sortEntriesByDate correctly', () => {
      const unsortedEntries: Entry[] = [
        { id: 2, weight: 68, date: '15-01-2024', description: 'Middle' },
        { id: 1, weight: 70, date: '01-01-2024', description: 'Earliest' },
        { id: 3, weight: 65, date: '01-02-2024', description: 'Latest' },
      ];

      const sortEntriesByDate = (component as any).sortEntriesByDate.bind(
        component
      );
      const sorted = sortEntriesByDate(unsortedEntries);

      expect(sorted.map((entry: Entry) => entry.date)).toEqual([
        '01-01-2024',
        '15-01-2024',
        '01-02-2024',
      ]);
    });

    it('should createChartData with correct structure', () => {
      const createChartData = (component as any).createChartData.bind(
        component
      );
      const chartData = createChartData(mockEntries);

      expect(chartData.labels).toEqual([
        '01-01-2024',
        '15-01-2024',
        '01-02-2024',
      ]);
      expect(chartData.datasets).toHaveLength(1);
      expect(chartData.datasets[0].data).toEqual([70, 68, 65]);
    });
  });

  describe('Empty Data Handling', () => {
    it('should handle empty data array', () => {
      store.overrideSelector(reducers.getDataState, []);
      fixture.detectChanges();

      expect(component.weightChartData).toBeNull();
    });
  });

  describe('Chart Configuration', () => {
    it('should have correct chart options structure', () => {
      const options = component.weightChartOptions;

      expect(options.scales.x.title.display).toBe(true);
      expect(options.scales.x.title.text).toBe('Date');
      expect(options.scales.y.title.display).toBe(true);
      expect(options.scales.y.title.text).toBe('Weight (kg)');
    });

    it('should match chart options snapshot', () => {
      expect(component.weightChartOptions).toMatchSnapshot();
    });
  });

  describe('Component Cleanup', () => {
    it('should use DestroyRef for cleanup', () => {
      const destroyRef = (component as any).destroyRef;
      expect(destroyRef).toBeDefined();
    });
  });
});
