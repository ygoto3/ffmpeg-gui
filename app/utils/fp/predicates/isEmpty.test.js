const isEmpty = require('./isEmpty');

describe('isEmpty', () => {
  it('checks if a value is empty', () => {
    expect(isEmpty({ hoge: 'hoge' })).toBeFalsy();
    expect(isEmpty([0, 1, 2])).toBeFalsy();
    expect(isEmpty('string')).toBeFalsy();
    expect(isEmpty(1)).toBeFalsy();
    expect(isEmpty(0)).toBeFalsy();
    expect(isEmpty(true)).toBeFalsy();
    expect(isEmpty(false)).toBeFalsy();

    expect(isEmpty(void 0)).toBeTruthy();
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
  });
});
