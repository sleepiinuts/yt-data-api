import { errReducer, initialState } from './error.reducer';

describe('Error Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = errReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
