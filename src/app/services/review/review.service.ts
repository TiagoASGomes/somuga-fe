import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {
  createReview,
  PaginationParams,
  Review,
  ReviewList,
  ReviewSearchParams,
  UpdateReview,
} from '../../../types';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private apiService: ApiService) {}

  getReviews(
    reviewSearchParams: ReviewSearchParams,
    paginationParams: PaginationParams
  ): Observable<ReviewList> {
    return this.apiService.get<ReviewList>(
      environment.apiUrl + 'review/public',
      {
        params: {
          ...reviewSearchParams,
          ...paginationParams,
        },
      }
    );
  }

  createReview(review: createReview, token: string): Observable<Review> {
    return this.apiService.post<Review>(
      environment.apiUrl + 'review/private',
      review,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      }
    );
  }

  updateReview(
    reviewId: number,
    review: UpdateReview,
    token: string
  ): Observable<Review> {
    return this.apiService.patch<Review>(
      environment.apiUrl + `review/private/${reviewId}`,
      review,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      }
    );
  }
}
