import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Like, Media, ShortReview } from '../../../types';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { LikeService } from '../../services/like/like.service';
import { ReviewService } from '../../services/review/review.service';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-media-page-title-card',
  standalone: true,
  imports: [ButtonModule, RatingModule, FormsModule],
  templateUrl: './media-page-title-card.component.html',
  styleUrl: './media-page-title-card.component.scss',
})
export class MediaPageTitleCardComponent {
  constructor(
    private auth: AuthService,
    private likeService: LikeService,
    private reviewService: ReviewService
  ) {}
  @Input({ required: true }) media!: Media;
  @Input({ required: true }) isLiked!: boolean;
  @Output() isLikedChange = new EventEmitter<boolean>();
  @Input({ required: true }) review!: ShortReview;
  @Output() reviewChange = new EventEmitter<ShortReview>();
  @Output() reviewMedia: EventEmitter<boolean> = new EventEmitter();

  isLogged = false;

  reviewToggle() {
    this.reviewMedia.emit(true);
  }

  like() {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.likeService.likeMedia({ mediaId: this.media.id }, token).subscribe({
        next: (like: Like) => {
          this.isLiked = true;
          this.isLikedChange.emit(this.isLiked);
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  dislike() {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.likeService.dislikeMedia(this.media.id, token).subscribe(
        () => {
          this.isLiked = false;
          this.isLikedChange.emit(this.isLiked);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  fetchReview() {
    if (!this.isLogged) {
      return;
    }
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.reviewService
          .getReviews(
            { userId: user.sub, mediaId: this.media.id },
            { page: 0, size: 10 }
          )
          .subscribe({
            next: (review) => {
              if (review.reviews.length > 0) {
                const reviewResponse = review.reviews[0];
                this.review = {
                  id: reviewResponse.id,
                  reviewScore: reviewResponse.reviewScore,
                  writtenReview: reviewResponse.writtenReview,
                };
                this.reviewChange.emit(this.review);
              }
            },
            error: (error) => {
              console.error('There was an error!', error);
            },
          });
      }
    });
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
    this.fetchReview();
  }
}
