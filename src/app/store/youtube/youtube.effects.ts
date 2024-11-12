import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, of, switchMap, tap } from 'rxjs';
import { APP_CONFIG } from '../../../environments/app-config.token';
import { ErrResp } from '../../models/error.model';
import { SearchResp } from '../../models/search-resp.model';
import { AppState, selectPageInfo } from '../all.selectors';
import { ErrorActions } from '../error/error.actions';
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

    let q = '';

    return this.actions$.pipe(
      ofType(YoutubeActions.loadYoutubeVideos),
      tap((props) => (q = props.data.q)),
      exhaustMap((props) =>
        this.httpClient
          .get<SearchResp>(
            `${this.appConfig.apiURL}?${params}&q=${props.data.q}`
          )
          .pipe(
            switchMap((resp) =>
              of(YoutubeActions.loadYoutubeVideosSuccess({ q: q, data: resp }))
            ),
            catchError((err: ErrResp) =>
              of(ErrorActions.errorsOccur({ err: err }))
            )
          )
      )
    );
  });

  loadMoreVideos$ = createEffect(() => {
    // part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]
    const params: string = [
      'part=snippet',
      'maxResults=25',
      `key=${this.appConfig.apiKey}`,
    ].join('&');

    return this.actions$.pipe(
      ofType(YoutubeActions.loadMoreYoutubeVideos),
      concatLatestFrom((props) => this.store.select(selectPageInfo)),
      switchMap(([props, pageInfo]) =>
        this.httpClient
          .get<SearchResp>(
            `${this.appConfig.apiURL}?${params}&q=${pageInfo.q}&pageToken=${pageInfo.pageToken}`
          )
          .pipe(
            switchMap((resp) =>
              of(
                YoutubeActions.loadMoreYoutubeVideosSuccess({
                  data: resp,
                })
              )
            ),
            catchError((err: ErrResp) =>
              of(ErrorActions.errorsOccur({ err: err }))
            )
          )
      )
    );
  });

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}
}
