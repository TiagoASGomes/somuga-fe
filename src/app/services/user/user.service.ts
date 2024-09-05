import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { CreateUser, User } from '../../../types';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUser(id: string | undefined): Observable<User> {
    return this.apiService.get<User>(environment.apiUrl + 'user/public', {
      params: {},
    });
  }

  createUser(createUserDto: CreateUser, token: string): Observable<User> {
    return this.apiService.post(
      environment.apiUrl + 'user/private',
      createUserDto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: 'application/json',
        },
      }
    );
  }
}
