const { exec } = require('child_process');
const { remote } = require('electron');
const { dialog } = remote;

const Observable = require('../../utils/fp/reactive/Observable');
const params2ffmpeg = require('../../ffmpeg/params2ffmpeg');

function createActions(model, actions) {
  const pageActions = {
    onLoad() {
      setupPage(model, actions);
    },
  };
  return pageActions;
}

function setupPage(model, actions) {
  Observable.fromEvent(document.getElementById('root'), 'click')
    .subscribe((e) => {
      const { target } = e;
      switch (target.id) {
        case 'run':
          runFfmpeg().then(([err, stdout, stderr]) => {
            if (err) {
              actions.updateLog(err);
            } else if (stderr) {
              actions.updateLog(stderr);
            } else {
              actions.updateLog(stdout);
            }
            actions.goTo('done');
          });
          break;
        case 'input':
          showInputDialog().then(files => {
            if (!files || !files.length) return;
            actions.updateParams({ input: files[0] });
          });
          break;
        case 'output':
          showOutputDialog().then(file => {
            if (!file) return;
            actions.updateParams({ output: file });
          });
          break;
        default:
          e.preventDefault();
      }
    });
  
  Observable.fromEvent(document.getElementById('root'), 'change')
    .subscribe((e) => {
      const { target } = e;
      switch (target.id) {
        case 'videoCodec':
        case 'profile':
        case 'videoBitrate':
        case 'bframes':
        case 'audioCodec':
        case 'audioBitrate':
          actions.updateParams({ [target.id]: e.target.value });
          break;
        default:
          e.preventDefault();
      }
    });
}

function showInputDialog() {
  return new Promise(resolve => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{
          name: 'Media files',
          extensions: ['mp4', 'avi', 'ts', 'm4s', 'mov', 'm4v', 'm4a'],
        }],
      }, resolve
    );
  });
}

function showOutputDialog() {
  return new Promise(resolve => {
    dialog.showSaveDialog({
        title: 'Output',
        filters: [{
          name: 'Media files',
          extensions: ['mp4', 'avi', 'ts', 'm4s', 'mov', 'm4v', 'm4a'],
        }],
      }, resolve
    );
  });
}

function runFfmpeg() {
  const cmd = `ffmpeg ${params2ffmpeg(model.params)}`;
  return new Promise(resolve => {
    exec(cmd, (...args) => resolve([...args]));
  });
}

module.exports = {
  createActions,
};
