import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../Models/Post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  url = 'https://jsonplaceholder.typicode.com/posts';

  getData(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(this.url);
  }
}
