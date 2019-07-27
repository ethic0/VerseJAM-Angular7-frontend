import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Poem, PoemListConfig } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class PoemsService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: PoemListConfig): Observable<{poems: Poem[], poemsCount: number}> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(
      '/poem' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(slug): Observable<Poem> {
    return this.apiService.get('/poem/' + slug)
      .pipe(map(data => data.poem));
  }

  destroy(slug) {
    return this.apiService.delete('/poem/' + slug);
  }

  save(poem): Observable<Poem> {
    // If we're updating an existing poem
    if (poem.slug) {
      return this.apiService.put('/poem/' + poem.slug, {poem: poem})
        .pipe(map(data => data.poem));

    // Otherwise, create a new poem
    } else {
      return this.apiService.post('/poem/', {poem: poem})
        .pipe(map(data => data.poem));
    }
  }

  favorite(slug): Observable<Poem> {
    return this.apiService.post('/poem/' + slug + '/favorite');
  }

  unfavorite(slug): Observable<Poem> {
    return this.apiService.delete('/poem/' + slug + '/favorite');
  }


}
