import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { YoutubeEffects } from './youtube.effects';

describe('YoutubeEffects', () => {
  let actions$: Observable<any>;
  let effects: YoutubeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        YoutubeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(YoutubeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
