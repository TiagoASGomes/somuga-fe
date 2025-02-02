import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import {
  CreateGame,
  DeveloperList,
  Game,
  GameLike,
  GameList,
  GameSearchParams,
  Genre,
  PaginationParams,
  Platform,
} from '../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

  createGame(game: CreateGame, token: string): Observable<Game> {
    return this.apiService.post<Game>(
      environment.apiUrl + 'game/private',
      game,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      }
    );
  }
}
