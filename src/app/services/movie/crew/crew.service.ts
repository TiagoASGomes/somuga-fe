import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import {
  CastSearchParam,
  CreateCrew,
  MovieCrew,
  MovieCrewList,
  PaginationParams,
} from '../../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  constructor(private apiService: ApiService) {}

  getCast(
    pageParams: PaginationParams,
    searchParams: CastSearchParam
  ): Observable<MovieCrewList> {
    return this.apiService.get<MovieCrewList>(
      environment.apiUrl + 'movie/crew/public',
      {
        params: {
          ...pageParams,
          ...searchParams,
        },
      }
    );
  }

  getById(id: string): Observable<MovieCrew> {
    return this.apiService.get<MovieCrew>(
      environment.apiUrl + 'movie/crew/public/' + id,
      {}
    );
  }

  createCrew(crew: CreateCrew, token: string): Observable<MovieCrew> {
    return this.apiService.post<MovieCrew>(
      environment.apiUrl + 'movie/crew/private',
      crew,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      }
    );
  }
}
