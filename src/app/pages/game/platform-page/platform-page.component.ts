import { Component } from '@angular/core';
import { GameService } from '../../../services/game/game.service';
import { PlatformService } from '../../../services/game/platform/platform.service';
import { ActivatedRoute } from '@angular/router';
import { Game, GameList, Platform } from '../../../../types';

@Component({
  selector: 'app-platform-page',
  templateUrl: './platform-page.component.html',
  styleUrl: './platform-page.component.scss',
})
export class PlatformPageComponent {
  constructor(
    private gameService: GameService,
    private platformService: PlatformService,
    private route: ActivatedRoute
  ) {}

  platform: Platform = {
    id: 0,
    platformName: '',
  };
  games: Game[] = [];
  size: number = 25;
  totalRecords: number = 0;
  searchParams = {
    platform: [''],
  };
  resetPage: boolean = false;

  fetchPlatform(id: string) {
    this.platformService.getById(id).subscribe({
      next: (platform) => {
        this.platform = platform;
        this.searchParams.platform[0] = platform.platformName;
        this.fetchGamesByGenre(0, this.size);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchGamesByGenre(page: number, size: number) {
    this.gameService.getGames({ page, size }, this.searchParams).subscribe({
      next: (data: GameList) => {
        this.games = data.games;
        this.totalRecords = data.count;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  onPageChange(event: any) {
    this.fetchGamesByGenre(event.page, event.rows);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchPlatform(id);
  }
}
