// @flow

/*::
export type Observer = {
  next: Function,
  error: Function,
  complete: Function,
};

export type Subscription = {
  dispose: Function,
};
*/

class Observable {

  /*::
  _forEach: Function;
  */
  
  static fromEvent(element/*: HTMLElement*/, eventName/*: string*/)/*: Observable*/ {
    return new Observable((observer/*: Observer*/)/*: Subscription*/ => {
      element.addEventListener(eventName, observer.next);
      return {
        dispose()/*: void*/ {
          element.removeEventListener(eventName, observer.next);
        }
      };
    });
  }

  constructor(forEach/*: (o: Observer) => Subscription*/) {
    this._forEach = forEach;
  }

  subscribe(next/*: any*/, error/*: ?Function*/, complete/*: ?Function*/)/*: Subscription*/ {
    if (typeof next !== 'function') return this._forEach(next);

    return this._forEach({
      next,
      error: error || function () {},
      complete: complete || function () {},
    });
  }

}

module.exports = Observable;
