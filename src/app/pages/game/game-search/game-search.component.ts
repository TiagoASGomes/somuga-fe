import { Component, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game/game.service';
import {
  DeveloperList,
  DropdownOption,
  Game,
  GameList,
  GameSearchParams,
  Genre,
} from '../../../../types';
import { FormBuilder, FormControl } from '@angular/forms';
import { DeveloperService } from '../../../services/game/developer/developer.service';
import { GenreService } from '../../../services/game/genre/genre.service';
import { PlatformService } from '../../../services/game/platform/platform.service';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrl: './game-search.component.scss',
})
export class GameSearchComponent {
  constructor(
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private developerService: DeveloperService,
    private platformService: PlatformService,
    private genreService: GenreService
  ) {}

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
  size: number = 25;
  totalRecords: number = 0;
  developerPage: number = 0;
  resetPage: boolean = false;
  displayAddGame: boolean = false;

  searchParamsForm = this.formBuilder.group({
    title: [''],
    developer: new FormControl<DropdownOption | null>({ name: '', id: 0 }),
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
    this.resetPage = true;
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
    this.developerService.getDevelopers({ page, size }, {}).subscribe({
      next: (data: DeveloperList) => {
        const newDevs = data.developers.map((dev) => ({
          id: dev.id,
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
    this.genreService.getGenres({}).subscribe({
      next: (data: Genre[]) => {
        this.genres = data.map((genre) => ({
          id: genre.id,
          name: genre.genreName,
        }));
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchPlatforms() {
    this.platformService.getPlatforms({}).subscribe({
      next: (data) => {
        this.platforms = data.map((platform) => ({
          id: platform.id,
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  toggleAddGame() {
    this.displayAddGame = true;
  }

  ngOnInit() {
    this.fetchGames(0, this.size);
    this.fetchDevelopers(this.developerPage, 500);
    this.fetchGenres();
    this.fetchPlatforms();
  }
}
