import { createReducer, on } from '@ngrx/store';
import { ErrResp } from '../../models/error.model';
import { ErrorActions } from './error.actions';

export const errorFeatureKey = 'error';

export interface errorState {
  err: ErrResp;
}

export const initialState: errorState = {
  err: <ErrResp>{},
};

export const errReducer = createReducer(
  initialState,
  on(ErrorActions.errorsOccur, (state, props) => ({
    ...state,
    err: props.err,
  }))
);
