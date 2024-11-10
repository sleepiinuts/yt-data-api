import { createActionGroup, props } from '@ngrx/store';
import { ErrResp } from '../../models/error.model';

export const ErrorActions = createActionGroup({
  source: 'Error',
  events: {
    'Errors occur': props<{ err: ErrResp }>(),
  },
});
