import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import {
  Developer,
  DeveloperList,
  DeveloperSearchParams,
  PaginationParams,
} from '../../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  constructor(private apiService: ApiService) {}

  getDevelopers(
    pageParams: PaginationParams,
    searchParams: DeveloperSearchParams
  ): Observable<DeveloperList> {
    return this.apiService.get<DeveloperList>(
      environment.apiUrl + 'game/developer/public',
      {
        params: {
          ...pageParams,
          ...searchParams,
        },
      }
    );
  }

  getById(id: string): Observable<Developer> {
    return this.apiService.get<Developer>(
      environment.apiUrl + 'game/developer/public/' + id,
      {}
    );
  }
}
