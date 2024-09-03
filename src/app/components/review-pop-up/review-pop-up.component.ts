import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ReviewService } from '../../services/review.service';
import { createReview } from '../../../types';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-review-pop-up',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './review-pop-up.component.html',
  styleUrl: './review-pop-up.component.scss',
})
export class ReviewPopUpComponent {
  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}
  @Input({ required: true }) display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input({ required: true }) mediaId!: number;

  reviewForm = this.formBuilder.group({
    reviewScore: 0,
    writenReview: '',
  });

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onConfirm() {
    const { reviewScore, writenReview } = this.reviewForm.value;

    const createReview: createReview = {
      mediaId: this.mediaId,
      reviewScore: reviewScore || 1,
      writenReview: writenReview || '',
    };

    // TODO: Add toasts

    this.authService.getAccessTokenSilently().subscribe((token) => {
      this.reviewService.createReview(createReview, token).subscribe(() => {
        this.display = false;
        this.displayChange.emit(this.display);
      });
    });
  }
}
