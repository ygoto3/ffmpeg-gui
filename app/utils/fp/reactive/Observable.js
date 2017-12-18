class Observable {
  
  static fromEvent(element, eventName) {
    return new Observable(observer => {
      if (!observer) {
        console.log(element);
        console.log(eventName);
      }
      element.addEventListener(eventName, observer.next);
      return {
        dispose() {
          element.removeEventListener(eventName, observer.next);
        }
      };
    });
  }

  constructor(forEach) {
    this._forEach = forEach;
  }

  subscribe(next, error, complete) {
    if (typeof next !== 'function') return this._forEach(next);

    return this._forEach({
      next,
      error: error || function () {},
      complete: complete || function () {},
    });
  }

}

module.exports = Observable;
