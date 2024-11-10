import { createReducer, on } from '@ngrx/store';
import { PageInfo } from '../../models/search-resp.model';
import { SearchResult } from '../../models/search-result.model';
import { YoutubeActions } from './youtube.actions';

export const youtubeFeatureKey = 'youtube';

export interface ytState {
  items: SearchResult[];
  pageInfo: PageInfo;
  nextPageToken: string;
  prevPageToken: string;
}

export const initialState: ytState = {
  items: [],
  pageInfo: { totalResults: 0, resultsPerPage: 0 },
  nextPageToken: '',
  prevPageToken: '',
};

export const ytReducer = createReducer(
  initialState,
  on(YoutubeActions.loadYoutubeVideosSuccess, (state, props) => ({
    ...state,
    items: props.data.items,
    pageInfo: props.data.pageInfo,
    nextPageToken: props.data.nextPageToken,
    prevPageToken: props.data.prevPageToken,
  }))
);
