import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../../../types';
import { GameService } from '../../../services/game.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private auth: AuthService
  ) {}
  game: Game | undefined;
  isLiked = false;
  isReviewed = false;
  displayReviewPopUp = false;

  fetchGame(id: string, token: string) {
    this.gameService.getGame(id, token).subscribe({
      next: (game) => {
        this.game = game.game;
        this.isLiked = game.like;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  toggleReviewPopUp(display: boolean) {
    this.displayReviewPopUp = !this.displayReviewPopUp;
  }

  likeGame() {
    this.isLiked = !this.isLiked;
  }

  fetchGameRequest(id: string) {
    this.auth.getAccessTokenSilently().subscribe({
      next: (token) => {
        this.fetchGame(id, token);
      },
      error: (error) => {
        this.fetchGame(id, '');
      },
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.fetchGameRequest(id);
  }
}
