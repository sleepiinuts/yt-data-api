import { createReducer, on } from '@ngrx/store';
import { YoutubeActions } from './youtube.actions';
import { SearchResult } from '../models/search-result.model';
import { PageInfo } from '../models/search-resp.model';
import { ErrResp } from '../models/error.model';

export const youtubeFeatureKey = 'youtube';

export interface State {
  items: SearchResult[];
  pageInfo: PageInfo;
  nextPageToken: string;
  prevPageToken: string;
  err: Error;
}

export const initialState: State = {
  items: [],
  pageInfo: { totalResults: 0, resultsPerPage: 0 },
  nextPageToken: '',
  prevPageToken: '',
  err: <ErrResp>{},
};

export const reducer = createReducer(
  initialState,
  on(YoutubeActions.loadYoutubeVideosSuccess, (state, props) => ({
    ...state,
    items: props.data.items,
    pageInfo: props.data.pageInfo,
    nextPageToken: props.data.nextPageToken,
    prevPageToken: props.data.prevPageToken,
  })),
  on(YoutubeActions.loadYoutubesVideoFailure, (state, props) => ({
    ...state,
    err: props.error,
  }))
);
