import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MoviePageComponent } from './movie-page/movie-page.component';

@NgModule({
  declarations: [MovieSearchComponent, MoviePageComponent],
  imports: [CommonModule, MovieRoutingModule],
})
export class MovieModule {}
