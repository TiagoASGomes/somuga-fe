import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSearchComponent } from './game-search/game-search.component';
import { GamePageComponent } from './game-page/game-page.component';

const routes: Routes = [
  {
    path: '',
    component: GameSearchComponent,
  },
  {
    path: ':id',
    component: GamePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
