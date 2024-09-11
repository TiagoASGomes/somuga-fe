import { Component } from '@angular/core';
import { Developer, Game, GameList } from '../../../../types';
import { GameService } from '../../../services/game/game.service';
import { DeveloperService } from '../../../services/game/developer/developer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-developer-page',
  templateUrl: './developer-page.component.html',
  styleUrl: './developer-page.component.scss',
})
export class DeveloperPageComponent {
  constructor(
    private gameService: GameService,
    private developerService: DeveloperService,
    private route: ActivatedRoute
  ) {}

  developer: Developer = {
    id: 0,
    developerName: '',
  };
  games: Game[] = [];
  size: number = 25;
  totalRecords: number = 0;
  searchParams = {
    developer: '',
  };
  resetPage: boolean = false;

  fetchDeveloper(id: string) {
    this.developerService.getById(id).subscribe({
      next: (developer) => {
        this.developer = developer;
        this.searchParams.developer = developer.developerName;
        this.fetchGamesByDeveloper(0, this.size);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchGamesByDeveloper(page: number, size: number) {
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
    this.fetchGamesByDeveloper(event.page, event.rows);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchDeveloper(id);
  }
}
