import { toLocalString } from '../useful-functions.helper';

describe('toLocalString', () => {
  it('should return a string', () => {
    const result = toLocalString();
    expect(typeof result).toBe('string');
  });
});
