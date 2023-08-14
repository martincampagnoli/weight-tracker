import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceholderModel } from '../models/PlaceholderModel';

/**
 * Service for fetching data from the external API.
 */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  readonly url = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * Get data from the API.
   *
   * @returns An observable containing an array of data results.
   */
  getData(): Observable<Array<PlaceholderModel>> {
    return this.httpClient.get<Array<PlaceholderModel>>(this.url);
  }
}
