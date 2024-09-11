import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ReviewService } from '../../services/review/review.service';
import { createReview, ShortReview, UpdateReview } from '../../../types';
import { AuthService } from '@auth0/auth0-angular';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    InputTextareaModule,
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
  @Input({ required: true }) review: ShortReview = {
    id: -1,
    reviewScore: 0,
    writtenReview: '',
  };

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

    // TODO: Add toasts

    if (this.review.id === -1) {
      this.createReview({
        mediaId: this.mediaId,
        reviewScore: reviewScore || 1,
        writtenReview: writenReview || '',
      });
    } else {
      this.updateReview({
        reviewScore: reviewScore || 1,
        writtenReview: writenReview || '',
      });
    }
  }

  createReview(createReview: createReview) {
    this.authService.getAccessTokenSilently().subscribe((token) => {
      this.reviewService.createReview(createReview, token).subscribe(() => {
        this.display = false;
        this.displayChange.emit(this.display);
      });
    });
  }

  updateReview(updateReview: UpdateReview) {
    this.authService.getAccessTokenSilently().subscribe((token) => {
      this.reviewService
        .updateReview(this.review.id, updateReview, token)
        .subscribe(() => {
          this.display = false;
          this.displayChange.emit(this.display);
        });
    });
  }

  ngOnChanges() {
    this.reviewForm.patchValue({
      reviewScore: this.review.reviewScore,
      writenReview: this.review.writtenReview,
    });
  }
}
