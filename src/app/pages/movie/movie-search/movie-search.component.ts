import { Component, ViewChild } from '@angular/core';
import {
  Movie,
  MovieCrewList,
  MovieList,
  MovieSearchParams,
} from '../../../../types';
import { MovieService } from '../../../services/movie/movie.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { CrewService } from '../../../services/movie/crew/crew.service';

interface DropdownOption {
  name: string;
  id: number;
}

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent {
  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private crewService: CrewService
  ) {}
  movies: Movie[] = [];
  cast: DropdownOption[] = [];
  searchParams: MovieSearchParams = {
    title: '',
    crewIds: [],
  };
  size: number = 25;
  totalRecords: number = 0;
  resetPage: boolean = false;
  addMovieDisplay: boolean = false;

  searchParamsForm = this.formBuilder.group({
    title: [''],
    crewIds: new FormControl<DropdownOption[] | null>([]),
  });

  changeParams() {
    const { title, crewIds } = this.searchParamsForm.value;

    this.searchParams = {
      title: title || '',
      crewIds: crewIds?.map((c: DropdownOption) => c.id) || [],
    };

    this.resetPage = true;
    this.fetchMovies(0, this.size);
  }

  fetchMovies(page: number, size: number) {
    this.movieService.getMovies({ page, size }, this.searchParams).subscribe({
      next: (data: MovieList) => {
        this.movies = data.movies;
        this.totalRecords = data.count;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchCast(page: number, size: number) {
    this.crewService.getCast({ page, size }, {}).subscribe({
      next: (data: MovieCrewList) => {
        const newCast = data.movieCrews.map((c) => ({
          name: c.name,
          id: c.id,
        }));
        this.cast = [...this.cast, ...newCast];
        if (this.cast.length < data.count) {
          this.fetchCast(page + 1, size);
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  onPageChange(event: any) {
    this.fetchMovies(event.page, event.rows);
  }
  
  toggleAddMovie() {
    this.addMovieDisplay = true;
  }

  ngOnInit() {
    this.fetchMovies(0, this.size);
    this.fetchCast(0, 500);
  }
}
