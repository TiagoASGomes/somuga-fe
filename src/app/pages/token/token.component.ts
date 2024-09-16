import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrl: './token.component.scss',
})
export class TokenComponent {
  constructor(
    private auth: AuthService,
    private messageService: MessageService
  ) {}
  token: string = '';

  getToken() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe((token) => {
          this.token = token;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Token copied',
          });
          navigator.clipboard.writeText(token);
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You are not authenticated, please login',
        });
      }
    });
  }
}
