function negate(fn) {
  return function (...args) {
    return !fn(...args);
  }
}

module.exports = negate;
