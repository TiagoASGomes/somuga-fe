import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../services/movie/movie.service';
import { Movie, Roles, ShortReview } from '../../../../types';

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
  review: ShortReview = {
    id: -1,
    reviewScore: 0,
    writtenReview: '',
  };
  displayReviewPopUp = false;

  fetchMovie(id: string) {
    this.movieService.getMovie(id).subscribe({
      next: (movie) => {
        this.movie = movie.movie;
        this.isLiked = movie.liked;
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchMovie(id);
  }
}
