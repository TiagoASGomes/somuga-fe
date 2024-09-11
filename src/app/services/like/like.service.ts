import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../../environments/environment';
import {
  CreateLike,
  Like,
  LikeList,
  LikeSearchParams,
  PaginationParams,
} from '../../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private apiService: ApiService) {}

  likeMedia(likeBody: CreateLike, token: string): Observable<Like> {
    return this.apiService.post(environment.apiUrl + 'like/private', likeBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
    });
  }

  dislikeMedia(mediaId: number, token: string): Observable<void> {
    return this.apiService.delete(environment.apiUrl + 'like/private', {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
      params: {
        mediaId: mediaId.toString(),
      },
    });
  }

  getLikes(
    likeSearchParams: LikeSearchParams,
    paginationParams: PaginationParams
  ): Observable<LikeList> {
    return this.apiService.get(environment.apiUrl + 'like/public', {
      headers: {
        contentType: 'application/json',
      },
      params: {
        ...likeSearchParams,
        ...paginationParams,
      },
    });
  }
}
