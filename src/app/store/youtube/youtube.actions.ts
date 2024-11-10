import { createActionGroup, props } from '@ngrx/store';
import { ErrResp } from '../../models/error.model';
import { SearchResp } from '../../models/search-resp.model';

export const YoutubeActions = createActionGroup({
  source: 'Youtube',
  events: {
    'Load Youtube videos': props<{ data: { q: string } }>(),
    'Load Youtube videos Success': props<{ data: SearchResp }>(),
    'Load Youtubes video Failure': props<{ error: ErrResp }>(),
  },
});
