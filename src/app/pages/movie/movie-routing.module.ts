import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MoviePageComponent } from './movie-page/movie-page.component';
import { CastSearchComponent } from './cast-search/cast-search.component';
import { CastPageComponent } from './cast-page/cast-page.component';

const routes: Routes = [
  { path: '', component: MovieSearchComponent },
  {
    path: 'info/:id',
    component: MoviePageComponent,
  },
  {
    path: 'cast',
    component: CastSearchComponent,
  },
  {
    path: 'cast/:id',
    component: CastPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
