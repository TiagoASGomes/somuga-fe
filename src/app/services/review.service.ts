import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { createReview, Review, ReviewList, ReviewSearchParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private apiService: ApiService) {}

  getReviews(reviewSearchParams: ReviewSearchParams): Observable<ReviewList> {
    return this.apiService.get<ReviewList>(
      environment.apiUrl + 'review/public',
      {
        params: {
          ...reviewSearchParams,
        },
      }
    );
  }

  createReview(review: createReview, token: string): Observable<Review> {
    return this.apiService.post<Review>(environment.apiUrl + 'review/private', review, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: 'application/json',
      },
    });
  }
}
