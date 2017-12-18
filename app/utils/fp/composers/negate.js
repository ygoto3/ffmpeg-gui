// @flow

function negate(predicate/*: () => boolean*/)/*: () => boolean*/ {
  return function (...args) {
    return !predicate(...args);
  }
}

module.exports = negate;
