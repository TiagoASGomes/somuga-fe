import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSearchComponent } from './game-search/game-search.component';
import { GamePageComponent } from './game-page/game-page.component';
import { DeveloperSearchComponent } from './developer-search/developer-search.component';
import { DeveloperPageComponent } from './developer-page/developer-page.component';
import { GenreSearchComponent } from './genre-search/genre-search.component';
import { GenrePageComponent } from './genre-page/genre-page.component';
import { PlatformSearchComponent } from './platform-search/platform-search.component';
import { PlatformPageComponent } from './platform-page/platform-page.component';

const routes: Routes = [
  {
    path: '',
    component: GameSearchComponent,
  },
  {
    path: 'info/:id',
    component: GamePageComponent,
  },
  {
    path: 'developer',
    component: DeveloperSearchComponent,
  },
  {
    path: 'developer/:id',
    component: DeveloperPageComponent,
  },
  {
    path: 'genre',
    component: GenreSearchComponent,
  },
  {
    path: 'genre/:id',
    component: GenrePageComponent,
  },
  {
    path: 'platform',
    component: PlatformSearchComponent,
  },
  {
    path: 'platform/:id',
    component: PlatformPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
