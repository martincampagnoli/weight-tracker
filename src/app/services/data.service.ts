import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from '../models/Entry';

/**
 * Service for fetching data from the external API.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  readonly url = 'assets/mocks/entries.json';

  /**
   * Get data from the API.
   *
   * @returns An observable containing an array of data results.
   */
  getData(): Observable<Array<Entry>> {
    return this.httpClient.get<Array<Entry>>(this.url);
  }
}
