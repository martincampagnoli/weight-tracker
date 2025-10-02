import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from '../models/Entry';

/**
 * Service for fetching data from the external API.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private httpClient = inject(HttpClient);
  readonly url = 'assets/mocks/entries.json';

  /**
   * Get data from the API.
   *
   * @returns An observable containing an array of data results.
   */
  getData(): Observable<Array<Entry>> {
    return this.httpClient.get<Array<Entry>>(this.url);
  }

  sortEntriesByDate(entries: Entry[]): Entry[] {
    return [...entries].sort((a, b) => {
      const dateA = this.parseDate(a.date);
      const dateB = this.parseDate(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
