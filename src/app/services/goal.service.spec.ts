import { TestBed } from '@angular/core/testing';
import { GoalService } from './goal.service';
import { DataService } from './data.service';

describe('GoalService', () => {
  let service: GoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalService, { provide: DataService, useValue: {} }],
    });

    service = TestBed.inject(GoalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });
});
