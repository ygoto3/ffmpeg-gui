const negate = require('./negate');

describe('negate', () => {
  it('negate a higher order function', () => {
    function truthy() {
      return true;
    }
    function falsy() {
      return false;
    }
    const notTruthy = negate(truthy);
    const notFalsy = negate(falsy);

    expect(notTruthy()).toBeFalsy();
    expect(notFalsy()).toBeTruthy();
  });
});
