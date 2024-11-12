import { createFeatureSelector, createSelector } from '@ngrx/store';
import { errorFeatureKey, errorState } from './error/error.reducer';
import { youtubeFeatureKey, ytState } from './youtube/youtube.reducer';

export interface AppState {
  youtube: ytState;
  error: errorState;
}

// export const selectError = createSelector(selectYoutube, (state) => state.err);
export const selectYoutube = createFeatureSelector<ytState>(youtubeFeatureKey);
export const selectError = createFeatureSelector<errorState>(errorFeatureKey);
// export const selectError = (state: AppState) => state.err;

export const selectPageInfo = createSelector(
  selectYoutube,
  (state: ytState) => ({ q: state.q, pageToken: state.nextPageToken })
);
