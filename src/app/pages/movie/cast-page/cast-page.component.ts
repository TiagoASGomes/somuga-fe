import { Component } from '@angular/core';
import { CrewService } from '../../../services/movie/crew/crew.service';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCrew, MovieList } from '../../../../types';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-cast-page',
  templateUrl: './cast-page.component.html',
  styleUrl: './cast-page.component.scss',
})
export class CastPageComponent {
  constructor(
    private castService: CrewService,
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  cast: MovieCrew = {
    id: 0,
    name: '',
    roles: [],
  };
  movies: Movie[] = [];
  totalRecords: number = 0;
  size: number = 25;
  resetPage: boolean = false;

  fetchCast(id: string) {
    this.castService.getById(id).subscribe({
      next: (cast) => {
        this.cast = cast;
        this.fetchMoviesByCast(0, this.size);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  fetchMoviesByCast(page: number, size: number) {
    this.movieService
      .getMovies({ page, size }, { crewIds: [this.cast.id] })
      .subscribe({
        next: (data: MovieList) => {
          this.movies = data.movies;
          this.totalRecords = data.count;
          this.movies.forEach((movie) => {
            this.mergeMovieWithRole(movie);
          });
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  mergeMovieWithRole(movie: Movie) {
    const role = this.cast.roles.find((role) => role.movieId === movie.id);
    if (role) {
      movie.movieRole = role.movieRole;
      movie.characterName = role.characterName;
    }
  }

  onPageChange(event: any) {
    this.fetchMoviesByCast(event.page, event.rows);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchCast(id);
  }
}
