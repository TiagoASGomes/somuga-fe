import { Component, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game.service';
import {
  DeveloperList,
  Game,
  GameList,
  GameSearchParams,
  Genre,
} from '../../../../types';
import { FormBuilder, FormControl } from '@angular/forms';
import { Paginator } from 'primeng/paginator';

interface DropdownOption {
  name: string;
}

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrl: './game-search.component.scss',
})
export class GameSearchComponent {
  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder
  ) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  games: Game[] = [];
  platforms: DropdownOption[] = [];
  genres: DropdownOption[] = [];
  developers: DropdownOption[] = [];
  searchParams: GameSearchParams = {
    title: '',
    developer: '',
    genre: [],
    platform: [],
  };
  size: number = 20;
  totalRecords: number = 0;
  developerPage: number = 0;

  searchParamsForm = this.formBuilder.group({
    title: [''],
    developer: new FormControl<DropdownOption | null>({ name: '' }),
    genre: new FormControl<DropdownOption[] | null>([]),
    platform: new FormControl<DropdownOption[] | null>([]),
  });

  changeParams() {
    const { title, developer, genre, platform } = this.searchParamsForm.value;
    const platforms = platform?.map((p: DropdownOption) => p.name);
    const genres = genre?.map((g: DropdownOption) => g.name);
    const developerName = developer?.name;

    this.searchParams = {
      title: title || '',
      developer: developerName || '',
      genre: genres || [],
      platform: platforms || [],
    };
    this.resetPaginator();
    this.fetchGames(0, this.size);
  }

  fetchGames(page: number, size: number) {
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

  fetchDevelopers(page: number, size: number) {
    this.gameService.getDevelopers({ page, size }).subscribe({
      next: (data: DeveloperList) => {
        const newDevs = data.developers.map((dev) => ({
          name: dev.developerName,
        }));
        this.developers = [...this.developers, ...newDevs];
        if (this.developers.length < data.count) {
          this.fetchDevelopers(page + 1, size);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchGenres() {
    this.gameService.getGenres().subscribe({
      next: (data: Genre[]) => {
        this.genres = data.map((genre) => ({ name: genre.genreName }));
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchPlatforms() {
    this.gameService.getPlatforms().subscribe({
      next: (data) => {
        this.platforms = data.map((platform) => ({
          name: platform.platformName,
        }));
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  onPageChange(event: any) {
    this.fetchGames(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  ngOnInit() {
    this.fetchGames(0, this.size);
    this.fetchDevelopers(this.developerPage, 500);
    this.fetchGenres();
    this.fetchPlatforms();
  }
}
