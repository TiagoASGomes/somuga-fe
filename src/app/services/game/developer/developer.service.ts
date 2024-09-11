import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import {
  CreateDeveloper,
  Developer,
  DeveloperList,
  GamePropertieSearchParam,
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
    searchParams: GamePropertieSearchParam
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

  createDeveloper(
    developer: CreateDeveloper,
    token: string
  ): Observable<Developer> {
    return this.apiService.post<Developer>(
      environment.apiUrl + 'game/developer/private',
      developer,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      }
    );
  }
}
