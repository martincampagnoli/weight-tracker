import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { AppEffects } from './default.effects';
import { DataService } from 'src/app/services/data.service';
import * as actions from './default.actions';
import { Entry } from 'src/app/models/Entry';

describe('AppEffects', () => {
  let effects: AppEffects;
  let actions$: Observable<any>;
  let dataService: jest.Mocked<DataService>;

  const mockEntries: Entry[] = [
    { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
    { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    { id: 3, weight: 65, date: '01-02-2024', description: 'Goal reached' },
  ];

  beforeEach(() => {
    const dataServiceSpy = {
      getData: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        {
          provide: DataService,
          useValue: dataServiceSpy,
        },
      ],
    });

    effects = TestBed.inject(AppEffects);
    dataService = TestBed.inject(DataService) as jest.Mocked<DataService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getData Effect', () => {
    it('should dispatch getDataSuccess when service returns data successfully', (done) => {
      dataService.getData.mockReturnValue(of(mockEntries));
      const action = actions.getData();
      actions$ = of(action);

      effects.getData.subscribe((result) => {
        expect(result.type).toBe('[Entry] Get Entries Success');
        expect((result as any).payload).toEqual(mockEntries);
        expect(dataService.getData).toHaveBeenCalled();
        done();
      });
    });

    it('should dispatch getFailure when service throws error', (done) => {
      const errorMessage = { message: 'Network Error' };
      dataService.getData.mockReturnValue(throwError(() => errorMessage));
      const action = actions.getData();
      actions$ = of(action);

      effects.getData.subscribe((result) => {
        expect(result.type).toBe('[Default] GetFailure  Error');
        expect((result as any).payload).toEqual(errorMessage);
        expect(dataService.getData).toHaveBeenCalled();
        done();
      });
    });

    it('should handle empty data response', (done) => {
      const emptyData: Entry[] = [];
      dataService.getData.mockReturnValue(of(emptyData));
      const action = actions.getData();
      actions$ = of(action);

      effects.getData.subscribe((result) => {
        expect(result.type).toBe('[Entry] Get Entries Success');
        expect((result as any).payload).toEqual(emptyData);
        done();
      });
    });

    it('should not respond to other actions', (done) => {
      const otherAction = actions.createEntry({
        payload: { weight: 70, date: '01-01-2024', description: 'Test' },
      });
      actions$ = of(otherAction);

      let emissionCount = 0;
      effects.getData.subscribe({
        next: () => emissionCount++,
        complete: () => {
          expect(emissionCount).toBe(0);
          expect(dataService.getData).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should handle HTTP error with status code', (done) => {
      const httpError = {
        status: 404,
        message: 'Not Found',
        error: 'File not found',
      };
      dataService.getData.mockReturnValue(throwError(() => httpError));
      const action = actions.getData();
      actions$ = of(action);

      effects.getData.subscribe((result) => {
        expect(result.type).toBe('[Default] GetFailure  Error');
        expect((result as any).payload).toEqual(httpError);
        done();
      });
    });
  });

  describe('Effect Configuration', () => {
    it('should be created', () => {
      expect(effects).toBeTruthy();
    });

    it('should inject DataService dependency', () => {
      expect(dataService).toBeDefined();
    });
  });
});
