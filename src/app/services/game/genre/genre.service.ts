import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Genre } from '../../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  constructor(private apiService: ApiService) {}

  getGenres(): Observable<Genre[]> {
    return this.apiService.get<Genre[]>(
      environment.apiUrl + 'game/genre/public',
      {}
    );
  }
}
