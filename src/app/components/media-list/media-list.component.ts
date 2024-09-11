import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Media } from '../../../types';
import { MediaItemComponent } from '../media-item/media-item.component';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-list',
  standalone: true,
  imports: [MediaItemComponent, PaginatorModule, CommonModule],
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent {
  @Input({ required: true }) medias: Media[] = [];
  @Input({ required: true }) totalRecords: number = 0;
  @Input({ required: true }) size: number = 25;
  @Output() onPageChange = new EventEmitter();
  @ViewChild('paginator') paginator: Paginator | undefined;
  @Input() resetPaginator: boolean = false;
  @Output() resetPaginatorChange = new EventEmitter<boolean>();

  changePage(event: any) {
    this.onPageChange.emit(event);
  }

  reset() {
    this.paginator?.changePage(0);
    this.resetPaginatorChange.emit(false);
  }

  ngOnChanges() {
    if (this.resetPaginator) {
      this.reset();
    }
  }
}
