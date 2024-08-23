import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MenubarModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private auth: AuthService) {}

  items: MenuItem[] = [];
  isLoggedIn: boolean = false;

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });
    this.items = [
      {
        label: 'Somuga',
      },
      {
        label: 'Home',
        routerLink: ['home'],
        icon: 'pi pi-home',
      },
      {
        label: 'Games',
        routerLink: ['game'],
        items: [
          {
            label: 'Games List',
            routerLink: ['game'],
          },
        ],
      },
      {
        label: 'Movies',
        routerLink: ['movie'],
        items: [
          {
            label: 'Movie List',
            routerLink: ['movie'],
          },
        ],
      },
    ];
  }
}
