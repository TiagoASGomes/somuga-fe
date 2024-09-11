import { Component } from '@angular/core';
import { MovieService } from '../../services/movie/movie.service';
import { GameService } from '../../services/game/game.service';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { Game, Media, Movie } from '../../../types';
import { DataViewModule } from 'primeng/dataview';
import { LikeService } from '../../services/like/like.service';
import { AuthService } from '@auth0/auth0-angular';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { MediaItemComponent } from '../../components/media-item/media-item.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    CommonModule,
    DataViewModule,
    PaginatorModule,
    RouterModule,
    MediaItemComponent,
    DividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private movieService: MovieService,
    private gameService: GameService,
    private likeService: LikeService,
    private auth: AuthService
  ) {}

  movieList: Movie[] = [];
  gameList: Game[] = [];
  likedMedia: Media[] = [];
  recommended: Media[] = [];
  likePage = 0;
  totalLikes = 0;
  recommendedPage = 0;
  size = 5;
  isAuthenticated = false;

  responsiveOptions: any[] | undefined;

  isGame(media: Media): boolean {
    return media.hasOwnProperty('platforms');
  }

  fetchTopRatedMovies() {
    this.movieService
      .getMovies({ page: 0, size: 15 }, {})
      .subscribe((movies) => {
        this.movieList = movies.movies;
      });
  }

  fetchTopRatedGames() {
    this.gameService.getGames({ page: 0, size: 15 }, {}).subscribe((games) => {
      this.gameList = games.games;
    });
  }

  unlikeMedia(media: Media) {
    console.log('unlike', media);
  }

  fetchLikes() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.likeService
          .getLikes(
            { userId: user.sub },
            { page: this.likePage, size: this.size }
          )
          .subscribe((likes) => {
            this.totalLikes = likes.count;
            this.likedMedia = likes.likes.map((like) => like.media);
          });
      }
    });
  }

  changePage(event: any) {
    this.likePage = event.page;
    this.fetchLikes();
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.fetchLikes();
      }
    });
    this.fetchTopRatedMovies();
    this.fetchTopRatedGames();
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
