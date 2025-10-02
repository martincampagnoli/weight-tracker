import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Entry } from '../models/Entry';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  const mockEntries: Entry[] = [
    { id: 1, weight: 70, date: '01-01-2024', description: 'Start' },
    { id: 2, weight: 68, date: '15-01-2024', description: 'Progress' },
    { id: 3, weight: 65, date: '01-02-2024', description: 'Goal reached' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    jest.clearAllMocks();
  });

  describe('Service Creation', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should have correct URL', () => {
      expect(service.url).toBe('assets/mocks/entries.json');
    });
  });

  describe('getData', () => {
    it('should return an Observable<Entry[]>', (done) => {
      service.getData().subscribe((entries) => {
        expect(entries).toEqual(mockEntries);
        expect(entries.length).toBe(3);
        done();
      });

      const req = httpTestingController.expectOne('assets/mocks/entries.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockEntries);
    });

    it('should handle empty response', (done) => {
      service.getData().subscribe((entries) => {
        expect(entries).toEqual([]);
        expect(entries.length).toBe(0);
        done();
      });

      const req = httpTestingController.expectOne('assets/mocks/entries.json');
      req.flush([]);
    });

    it('should handle HTTP errors', (done) => {
      service.getData().subscribe({
        next: () => fail('Expected error'),
        error: (error) => {
          expect(error.status).toBe(404);
          done();
        },
      });

      const req = httpTestingController.expectOne('assets/mocks/entries.json');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });

    it('should make only one HTTP request', () => {
      service.getData().subscribe();

      const requests = httpTestingController.match('assets/mocks/entries.json');
      expect(requests.length).toBe(1);

      requests[0].flush(mockEntries);
    });

    it('should handle malformed data gracefully', (done) => {
      const malformedData = [
        { id: 1, weight: 70 },
        { weight: 68, date: '15-01-2024' },
      ];

      service.getData().subscribe((entries) => {
        expect(entries).toEqual(malformedData);
        done();
      });

      const req = httpTestingController.expectOne('assets/mocks/entries.json');
      req.flush(malformedData);
    });
  });

  describe('Service Properties', () => {
    it('should be provided in root', () => {
      expect(service).toBeInstanceOf(DataService);
    });
  });
});
