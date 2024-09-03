import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: environment.auth0Domain,
      clientId: environment.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.audience,
      },
      cacheLocation: 'localstorage',
    }),
  ],
};
