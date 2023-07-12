import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceholderModel } from '../models/PlaceholderModel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  readonly url = 'https://jsonplaceholder.typicode.com/posts';

  getData(): Observable<Array<PlaceholderModel>> {
    return this.httpClient.get<Array<PlaceholderModel>>(this.url);
  }
}
