import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  DeveloperList,
  Game,
  GameLike,
  GameList,
  GameSearchParams,
  Genre,
  PaginationParams,
  Platform,
} from '../../types';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private apiService: ApiService) {}

  getGames(
    pageParams: PaginationParams,
    searchParams: GameSearchParams
  ): Observable<GameList> {
    return this.apiService.get<GameList>(environment.apiUrl + 'game/public', {
      params: {
        ...pageParams,
        ...searchParams,
      },
    });
  }

  getGame(id: string, token: string): Observable<GameLike> {
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    return this.apiService.get<GameLike>(
      environment.apiUrl + 'game/public/' + id,
      options
    );
  }

  getDevelopers(pageParams: PaginationParams): Observable<DeveloperList> {
    return this.apiService.get<DeveloperList>(
      environment.apiUrl + 'game/developer/public',
      {
        params: {
          ...pageParams,
        },
      }
    );
  }

  getGenres(): Observable<Genre[]> {
    return this.apiService.get<Genre[]>(
      environment.apiUrl + 'game/genre/public',
      {}
    );
  }

  getPlatforms(): Observable<Platform[]> {
    return this.apiService.get<Platform[]>(
      environment.apiUrl + 'game/platform/public',
      {}
    );
  }
}
