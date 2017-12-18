'use strict';

const Observable = require('./Observable');

describe('Observable', () => {
  it('fromEvent', () => {
    const elem = document.createElement('p');
    const clickStream = Observable.fromEvent(elem, 'click');
    const promise = new Promise(resolve => {
      const clickSubscription = clickStream.subscribe(
        (e) => resolve(e.type),
        console.error,
      );
    });
    elem.dispatchEvent(new MouseEvent('click'));
    return expect(promise).resolves.toBe('click');
  });
});
