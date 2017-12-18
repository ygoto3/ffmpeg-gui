const main = require('./main');
const done = require('./done');

module.exports = {
  main: main.createActions,
  done: done.createActions,
};
