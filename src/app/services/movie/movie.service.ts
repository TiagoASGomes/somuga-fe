import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import {
  MovieCrewList,
  MovieLike,
  MovieList,
  MovieSearchParams,
  PaginationParams,
} from '../../../types';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private apiService: ApiService) {}

  getMovies(
    pageParams: PaginationParams,
    searchParams: MovieSearchParams
  ): Observable<MovieList> {
    return this.apiService.get<MovieList>(environment.apiUrl + 'movie/public', {
      params: {
        ...pageParams,
        ...searchParams,
      },
    });
  }

  getMovie(id: string): Observable<MovieLike> {
    return this.apiService.get<MovieLike>(
      environment.apiUrl + 'movie/public/' + id,
      {}
    );
  }
}
