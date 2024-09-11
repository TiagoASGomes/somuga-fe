import { Component, Input } from '@angular/core';
import { Media } from '../../../types';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-item',
  standalone: true,
  imports: [
    RouterModule,
    RatingModule,
    FormsModule,
    TruncateStringPipe,
    CommonModule,
  ],
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss',
})
export class MediaItemComponent {
  @Input({ required: true }) media!: Media;

  stars: number = 0;
  mediaType: string = '';

  checkMediaType() {
    if (this.media.hasOwnProperty('platforms')) {
      this.mediaType = 'game';
    } else {
      this.mediaType = 'movie';
    }
  }

  ngOnInit() {
    this.stars = this.media.averageRating;
    this.checkMediaType();
  }
}
