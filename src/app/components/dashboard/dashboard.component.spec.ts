import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { Entry } from 'src/app/models/Entry';
import * as reducers from 'src/app/store/default';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { ViewProgressDialogComponent } from '../view-progress-dialog/view-progress-dialog.component';
import { GoalService } from 'src/app/services/goal.service';
import { AddGoalDialogComponent } from '../add-goal-dialog/add-goal-dialog.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  let mockDialog: jest.Mocked<MatDialog>;
  const mockGoalService = {
    calculateGoalProgress: jest.fn().mockReturnValue(75),
  };

  const mockEntries: Entry[] = [
    { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
    { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    { id: 3, weight: 65, date: '01-02-2024', description: 'Goal reached' },
    { id: 4, weight: 67, date: '15-02-2024', description: 'Maintenance' },
    { id: 5, weight: 66, date: '01-03-2024', description: 'Continued' },
  ];

  const initialState = {} as any;

  beforeEach(async () => {
    mockDialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of(true),
      }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, NoopAnimationsModule],
      providers: [
        { provide: GoalService, useValue: mockGoalService },
        provideMockStore({ initialState }),
        {
          provide: MatDialog,
          useValue: mockDialog,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(reducers.getDataState, mockEntries);
    store.overrideSelector(reducers.getTargetWeight, 75);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
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
    it('should initialize with correct default values', () => {
      expect(component.lowValue).toBe(0);
      expect(component.highValue).toBe(3);
      expect(component.pageSize).toBe(3);
      expect(component.pageSizeOptions).toEqual([3, 9, 30, 90]);
    });

    it('should dispatch getData action on construction', () => {
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      const newFixture = TestBed.createComponent(DashboardComponent);

      expect(dispatchSpy).toHaveBeenCalledWith(reducers.getData());
    });

    it('should subscribe to data state', () => {
      fixture.detectChanges();

      expect(component['filteredData']()).toEqual(mockEntries);
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should handle page events correctly', () => {
      const pageEvent: PageEvent = {
        pageIndex: 1,
        pageSize: 3,
        length: 5,
      };

      const result = component.getPaginatorData(pageEvent);

      expect(component.lowValue).toBe(3);
      expect(component.highValue).toBe(6);
      expect(result).toEqual(pageEvent);
    });

    it('should calculate pagination correctly for different page sizes', () => {
      const pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 9,
        length: 5,
      };

      component.getPaginatorData(pageEvent);

      expect(component.lowValue).toBe(0);
      expect(component.highValue).toBe(9);
    });
  });

  describe('Dialog Opening', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should open AddEntryDialogComponent for addEntry type', () => {
      component.openDialog('addEntry');

      expect(mockDialog.open).toHaveBeenCalledWith(AddEntryDialogComponent, {
        width: '400px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
      });
    });

    it('should open ViewProgressDialogComponent for viewProgress type', () => {
      component.openDialog('viewProgress');

      expect(mockDialog.open).toHaveBeenCalledWith(
        ViewProgressDialogComponent,
        {
          width: '400px',
          enterAnimationDuration: '0ms',
          exitAnimationDuration: '0ms',
        }
      );
    });

    it('should open AddEntryDialogComponent for unknown type (default)', () => {
      component.openDialog('unknown');

      expect(mockDialog.open).toHaveBeenCalledWith(AddEntryDialogComponent, {
        width: '400px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
      });
    });

    it('should open AddGoalDialogComponent for setWeightGoal type', () => {
      component.openDialog('setWeightGoal');

      expect(mockDialog.open).toHaveBeenCalledWith(AddGoalDialogComponent, {
        width: '400px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
      });
    });
  });

  describe('Template Rendering', () => {
    beforeEach(() => {
      store.overrideSelector(reducers.getDataState, mockEntries);
      store.overrideSelector(reducers.getTargetWeight, 65);
      store.refreshState();
      fixture.detectChanges();
    });

    it('should render entries count', () => {
      const entriesCount =
        fixture.debugElement.nativeElement.querySelector('.entries-count');
      expect(entriesCount.textContent.trim()).toBe('5 entries');
    });

    it('should render action buttons', () => {
      const buttons =
        fixture.debugElement.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it('should render paginator when entries > 3', () => {
      const paginator =
        fixture.debugElement.nativeElement.querySelector('mat-paginator');
      expect(paginator).toBeTruthy();
    });
  });

  describe('Data Updates', () => {
    it('should update filteredData when store data changes', () => {
      const newEntries: Entry[] = [
        { id: 6, weight: 64, date: '15-03-2024', description: 'New entry' },
      ];

      store.overrideSelector(reducers.getDataState, newEntries);
      store.refreshState();
      fixture.detectChanges();

      expect(component['filteredData']()).toEqual(newEntries);
    });
  });
});
