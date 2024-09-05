import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSearchComponent } from './game-search/game-search.component';
import { GamePageComponent } from './game-page/game-page.component';
import { DeveloperSearchComponent } from './developer-search/developer-search.component';
import { DeveloperPageComponent } from './developer-page/developer-page.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
