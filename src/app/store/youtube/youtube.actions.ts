import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SearchResp } from '../../models/search-resp.model';

export const YoutubeActions = createActionGroup({
  source: 'Youtube',
  events: {
    'Load Youtube videos': props<{ data: { q: string } }>(),
    'Load Youtube videos Success': props<{ q: string; data: SearchResp }>(),
    'Load More Youtube videos': emptyProps(),
    'Load More Youtube videos Success': props<{ data: SearchResp }>(),
  },
});
