import { Component, Input } from '@angular/core';
import { Media } from '../../../types';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent {
  @Input({ required: true }) media: Media[] = [];
  
}
