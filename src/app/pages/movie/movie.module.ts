import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { MediaItemComponent } from '../../components/media-item/media-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MediaPageTitleCardComponent } from '../../components/media-page-title-card/media-page-title-card.component';
import { ReviewPopUpComponent } from '../../components/review-pop-up/review-pop-up.component';
import { MediaReviewsComponent } from '../../components/media-reviews/media-reviews.component';
import { MediaListComponent } from '../../components/media-list/media-list.component';
import { CastSearchComponent } from './cast-search/cast-search.component';
import { CastPageComponent } from './cast-page/cast-page.component';
import { AddMovieComponent } from '../../components/add-movie/add-movie.component';
import { AddMovieCrewComponent } from '../../components/add-movie-crew/add-movie-crew.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    MovieSearchComponent,
    MoviePageComponent,
    CastSearchComponent,
    CastPageComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MediaItemComponent,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    MediaPageTitleCardComponent,
    ReviewPopUpComponent,
    MediaReviewsComponent,
    MediaListComponent,
    AddMovieComponent,
    AddMovieCrewComponent,
    InputTextModule,
  ],
})
export class MovieModule {}
