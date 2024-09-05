import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  size: number;
}

export interface SearchParams {}

export interface GameSearchParams extends SearchParams {
  title?: string;
  developer?: string;
  genre?: string[];
  platform?: string[];
}

export interface MovieSearchParams extends SearchParams {
  title?: string;
  crewIds?: number[];
}

export interface DeveloperSearchParams extends SearchParams {
  name?: string;
}

export interface Media {
  id: number;
  title: string;
  releaseDate: string;
  description: string;
  averageRating: number;
  likes: number;
  mediaUrl: string;
  imageUrl: string;
}

export interface CreateGame {
  title: string;
  releaseDate: string;
  developerId: number;
  genreIds: number[];
  platformIds: number[];
  description: string;
  mediaUrl: string;
  imageUrl?: string;
}

export interface Game extends Media {
  developer: Developer;
  genres: Genre[];
  platforms: Platform[];
}

export interface GameList {
  games: Game[];
  count: number;
}

export interface GameLike {
  game: Game;
  liked: boolean;
}

export interface Developer {
  id: number;
  developerName: string;
}

export interface DeveloperList {
  developers: Developer[];
  count: number;
}

export interface Genre {
  id: number;
  genreName: string;
}

export interface Platform {
  id: number;
  platformName: string;
}

export interface CreateMovie {
  title: string;
  releaseDate: string;
  description: string;
  duration: number;
  crew: CreateRoles[];
  mediaUrl: string;
  imageUrl: string;
}

export interface CreateRoles {
  movieCrewId: number;
  movieRole: string;
  characterName?: string;
}

export interface Movie extends Media {
  duration: number;
  crew: Roles[];
}

export interface MovieList {
  movies: Movie[];
  count: number;
}

export interface MovieLike {
  movie: Movie;
  liked: boolean;
}

export interface Roles {
  id: number;
  fullName: string;
  movieRole: string;
  characterName: string;
}

export interface CreateLike {
  mediaId: number;
}

export interface Like {
  id: number;
  user: User;
  media: Media;
}

export interface LikeList {
  likes: Like[];
  count: number;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  joinDate: string;
}

export interface UserList {
  users: User[];
  count: number;
}

export interface CreateUser {
  userName: string;
  email: string;
}

export interface MovieCrew {
  id: number;
  name: string;
  roles: MovieCrewRole[];
}

export interface MovieCrewList {
  movieCrews: MovieCrew[];
  count: number;
}

export interface MovieCrewRole {
  movieRole: string;
  characterName: string;
  movieId: number;
  movieTitle: string;
  movieReleaseDate: string;
}

export interface createReview {
  mediaId: number;
  reviewScore: number;
  writtenReview: string;
}

export interface UpdateReview {
  reviewScore: number;
  writtenReview: string;
}

export interface ReviewSearchParams extends SearchParams {
  userId?: string;
  mediaId?: number;
}

export interface Review {
  id: number;
  user: User;
  mediaId: number;
  reviewScore: number;
  writtenReview: string;
}

export interface ShortReview {
  id: number;
  reviewScore: number;
  writtenReview: string;
}

export interface ReviewList {
  reviews: Review[];
  count: number;
}
