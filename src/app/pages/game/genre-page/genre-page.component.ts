import { Component } from '@angular/core';
import { GameService } from '../../../services/game/game.service';
import { GenreService } from '../../../services/game/genre/genre.service';
import { ActivatedRoute } from '@angular/router';
import { Game, GameList, Genre } from '../../../../types';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrl: './genre-page.component.scss',
})
export class GenrePageComponent {
  constructor(
    private gameService: GameService,
    private genreService: GenreService,
    private route: ActivatedRoute
  ) {}

  genre: Genre = {
    id: 0,
    genreName: '',
  };
  games: Game[] = [];
  size: number = 25;
  totalRecords: number = 0;
  searchParams = {
    genre: [''],
  };
  resetPage: boolean = false;

  fetchGenre(id: string) {
    this.genreService.getById(id).subscribe({
      next: (genre) => {
        this.genre = genre;
        this.searchParams.genre[0] = genre.genreName;
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
    this.fetchGenre(id);
  }
}
