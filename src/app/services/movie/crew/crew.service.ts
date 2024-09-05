import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { MovieCrewList, PaginationParams } from '../../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  constructor(private apiService: ApiService) {}

  getCast(pageParams: PaginationParams): Observable<MovieCrewList> {
    return this.apiService.get<MovieCrewList>(
      environment.apiUrl + 'movie/crew/public',
      {
        params: {
          ...pageParams,
        },
      }
    );
  }
}
