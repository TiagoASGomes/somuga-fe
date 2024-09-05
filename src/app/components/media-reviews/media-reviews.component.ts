import { Component, Input } from '@angular/core';
import { Review } from '../../../types';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review/review.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-media-reviews',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule, PaginatorModule],
  templateUrl: './media-reviews.component.html',
  styleUrl: './media-reviews.component.scss',
})
export class MediaReviewsComponent {
  constructor(private reviewService: ReviewService) {}

  @Input({ required: true }) mediaId!: number;

  reviews: Review[] = [];
  size: number = 5;
  totalRecords: number = 0;

  fetchReviews(page: number, size: number) {
    this.reviewService
      .getReviews({ mediaId: this.mediaId }, { page, size })
      .subscribe((reviews) => {
        this.reviews = reviews.reviews;
        this.totalRecords = reviews.count;
      });
  }

  onPageChange(event: any) {
    this.fetchReviews(event.page, event.rows);
  }

  ngOnInit() {
    this.fetchReviews(0, this.size);
  }
}
