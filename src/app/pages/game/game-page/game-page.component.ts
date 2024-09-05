import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Review, ShortReview, UpdateReview } from '../../../../types';
import { GameService } from '../../../services/game/game.service';
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
  review: ShortReview = {
    id: -1,
    reviewScore: 0,
    writtenReview: '',
  };
  displayReviewPopUp = false;

  fetchGame(id: string, token: string) {
    this.gameService.getGame(id, token).subscribe({
      next: (game) => {
        this.game = game.game;
        this.isLiked = game.liked;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  toggleReviewPopUp(display: boolean) {
    this.displayReviewPopUp = display;
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
