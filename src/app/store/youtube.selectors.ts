import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, youtubeFeatureKey } from './youtube.reducer';

const selectYoutube = createFeatureSelector<State>(youtubeFeatureKey);

export const selectError = createSelector(selectYoutube, (state) => state.err);
