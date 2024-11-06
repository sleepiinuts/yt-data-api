import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, of, switchMap } from 'rxjs';
import { APP_CONFIG } from '../../environments/app-config.token';
import { ErrResp } from '../models/error.model';
import { SearchResp } from '../models/search-resp.model';
import { YoutubeActions } from './youtube.actions';

@Injectable()
export class YoutubeEffects {
  private readonly url = '';
  private appConfig = inject(APP_CONFIG);
  private actions$ = inject(Actions);

  loadVideos$ = createEffect(() => {
    // part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
    const params: string = [
      'part=snippet',
      'maxResults=25',
      `key=${this.appConfig.apiKey}`,
    ].join('&');

    return this.actions$.pipe(
      ofType(YoutubeActions.loadYoutubeVideos),
      exhaustMap((props) =>
        this.httpClient
          .get<SearchResp>(
            `${this.appConfig.apiURL}?${params}&q=${props.data.q}`
          )
          .pipe(
            switchMap((resp) =>
              of(YoutubeActions.loadYoutubeVideosSuccess({ data: resp }))
            ),
            catchError((err: ErrResp) =>
              of(YoutubeActions.loadYoutubesVideoFailure({ error: err }))
            )
          )
      )
    );
  });

  constructor(private httpClient: HttpClient) {}
}
