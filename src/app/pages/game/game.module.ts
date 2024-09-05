import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './game-page/game-page.component';
import { GameSearchComponent } from './game-search/game-search.component';
import { MediaItemComponent } from '../../components/media-item/media-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MediaPageTitleCardComponent } from '../../components/media-page-title-card/media-page-title-card.component';
import { MediaReviewsComponent } from '../../components/media-reviews/media-reviews.component';
import { ReviewPopUpComponent } from '../../components/review-pop-up/review-pop-up.component';
import { DeveloperSearchComponent } from './developer-search/developer-search.component';
import { DeveloperPageComponent } from './developer-page/developer-page.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';

@NgModule({
  declarations: [
    GamePageComponent,
    GameSearchComponent,
    DeveloperSearchComponent,
    DeveloperPageComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MediaItemComponent,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    MediaPageTitleCardComponent,
    MediaReviewsComponent,
    ReviewPopUpComponent,
    MediaListComponent,
  ],
})
export class GameModule {}
