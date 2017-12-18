'use strict';

const {
  state,
  actions,
  model,
  init,
} = require('./sam');
const { renderer } = require('./utils/renderer');

const root = document.getElementById('root');
init( renderer(root) );
actions.goTo('main');
