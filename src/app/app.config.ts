import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { APP_CONFIG } from '../environments/app-config.token';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { errorFeatureKey, errReducer } from './store/error/error.reducer';
import { YoutubeEffects } from './store/youtube/youtube.effects';
import { youtubeFeatureKey, ytReducer } from './store/youtube/youtube.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: APP_CONFIG, useValue: environment },
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: youtubeFeatureKey, reducer: ytReducer }),
    provideState({ name: errorFeatureKey, reducer: errReducer }),
    provideEffects(YoutubeEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
