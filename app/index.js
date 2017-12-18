// @flow
'use strict';

const {
  state,
  actions,
  model,
  init,
} = require('./sam');
const { renderer } = require('./utils/renderer');

const root = ((document.getElementById('root')/*: any*/)/*: HTMLElement*/);
init( renderer(root) );
actions.goTo('main');
