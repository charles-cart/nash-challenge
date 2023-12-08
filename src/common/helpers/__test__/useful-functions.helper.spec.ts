import { toLocalString } from '../useful-functions.helper';

describe('toLocalString', () => {
  it('should return a string', () => {
    const result = toLocalString();
    expect(typeof result).toBe('string');
  });

  it('should return a string representing the current date and time', () => {
    const result = toLocalString();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    expect(
      result.startsWith(
        `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
      ),
    ).toBe(true);
  });
});
