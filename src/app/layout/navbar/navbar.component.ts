import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { User } from '../../../types';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MenubarModule, ButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private auth: AuthService, private userService: UserService) {}

  items: MenuItem[] = [
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
        {
          label: 'Developers',
          routerLink: ['game/developer'],
        }
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
  isLoggedIn: boolean = false;

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    localStorage.removeItem('userId');
    this.auth.logout();
  }

  checkLogin() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
      if (isAuthenticated) {
        this.auth.user$.subscribe((user: any) => {
          if (user?.isFirstLogin) {
            const storageId = localStorage.getItem('userId');
            if (storageId === user.sub) {
              return;
            }
            this.auth.getAccessTokenSilently().subscribe((token) => {
              this.userService
                .createUser(
                  {
                    userName: user.nickname,
                    email: user.email,
                  },
                  token
                )
                .subscribe({
                  next: (user) => {
                    localStorage.setItem('userId', user.id);
                  },
                  error: (error) => {
                    console.error(error);
                  },
                });
            });
          }
        });
      }
    });
  }

  ngOnInit() {
    this.checkLogin();
  }
}
