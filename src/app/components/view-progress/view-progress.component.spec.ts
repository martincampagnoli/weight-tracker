import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { ViewProgressComponent } from './view-progress.component';
import { Entry } from 'src/app/models/Entry';
import * as reducers from 'src/app/store/default';
import { DataService } from 'src/app/services/data.service';

describe('ViewProgressComponent', () => {
  let component: ViewProgressComponent;
  let fixture: ComponentFixture<ViewProgressComponent>;
  let store: MockStore;

  const mockEntries: Entry[] = [
    { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
    { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    { id: 3, weight: 65, date: '01-02-2024', description: 'Goal reached' },
  ];

  const initialState = {
    data: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProgressComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: DataService,
          useValue: {
            getData: jest.fn().mockReturnValue(of(mockEntries)),
            sortEntriesByDate: jest.fn().mockReturnValue(mockEntries),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ViewProgressComponent);
    component = fixture.componentInstance;
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

  describe('Private Methods', () => {
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
