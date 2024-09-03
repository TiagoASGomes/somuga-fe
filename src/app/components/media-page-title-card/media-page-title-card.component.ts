import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Media } from '../../../types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-media-page-title-card',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './media-page-title-card.component.html',
  styleUrl: './media-page-title-card.component.scss',
})
export class MediaPageTitleCardComponent {
  @Input({ required: true }) media!: Media;
  @Input({ required: true }) isLiked!: boolean;
  @Input({ required: true }) isReviewed!: boolean;
  @Output() likeMedia: EventEmitter<boolean> = new EventEmitter();
  @Output() reviewMedia: EventEmitter<boolean> = new EventEmitter();

  review() {
    this.reviewMedia.emit(true);
  }

  like() {
    this.likeMedia.emit(true);
  }
}
