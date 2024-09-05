import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Observable } from 'rxjs';
import { Platform } from '../../../../types';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private apiService: ApiService) {}

  getPlatforms(): Observable<Platform[]> {
    return this.apiService.get<Platform[]>(
      environment.apiUrl + 'game/platform/public',
      {}
    );
  }
}
