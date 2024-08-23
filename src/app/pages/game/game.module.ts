import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './game-page/game-page.component';
import { GameSearchComponent } from './game-search/game-search.component';

@NgModule({
  declarations: [GamePageComponent, GameSearchComponent],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
