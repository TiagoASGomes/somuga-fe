import { Component, Input } from '@angular/core';
import { Review } from '../../../types';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-media-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-reviews.component.html',
  styleUrl: './media-reviews.component.scss',
})
export class MediaReviewsComponent {
  constructor(private reviewService: ReviewService) {}

  @Input({ required: true }) mediaId!: number;

  totalRecords: number = 0;
  reviews: Review[] = [];

  fetchReviews() {
    this.reviewService
      .getReviews({ mediaId: this.mediaId })
      .subscribe((reviews) => {
        this.reviews = reviews.reviews;
        this.totalRecords = reviews.count;
      });
  }

  ngOnInit() {
    this.fetchReviews();
  }
}
