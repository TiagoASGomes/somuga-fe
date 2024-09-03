import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { Movie, Roles } from '../../../../types';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent {
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}
  movie: Movie | undefined;
  isLiked = false;
  isReviewed = false;
  displayReviewPopUp = false;

  fetchMovie(id: string) {
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie.movie;
        this.isLiked = movie.like;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  getDirector(): string {
    return (
      this.movie?.crew.find((member) => member.movieRole === 'DIRECTOR')
        ?.fullName || ''
    );
  }

  getWriters(): string[] {
    return (
      this.movie?.crew
        .filter((member) => member.movieRole === 'WRITER')
        .map((member) => member.fullName) || []
    );
  }

  getProducers(): string[] {
    return (
      this.movie?.crew
        .filter((member) => member.movieRole === 'PRODUCER')
        .map((member) => member.fullName) || []
    );
  }

  getActors(): Roles[] {
    return (
      this.movie?.crew.filter((member) => member.movieRole === 'ACTOR') || []
    );
  }

  toggleReviewPopUp(display: boolean) {
    this.displayReviewPopUp = !this.displayReviewPopUp;
  }

  like() {
    this.isLiked = !this.isLiked;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchMovie(id);
  }
}
