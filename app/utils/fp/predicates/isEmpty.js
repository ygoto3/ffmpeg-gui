// @flow

function isEmpty(v/*: any*/)/*: boolean*/ {
  return v === null || v === void 0 || v === '';
}

module.exports = isEmpty;
