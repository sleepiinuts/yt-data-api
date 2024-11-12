import { initialState, ytReducer } from './youtube.reducer';

describe('Youtube Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ytReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
