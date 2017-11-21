'use strict';

const fs = require('fs');
const { exec } = require('child_process');
const { remote } = require('electron');
const { dialog } = remote;

const Observable = require('./fp/reactive/Observable');
const params2ffmpeg = require('./ffmpeg/params2ffmpeg');

////////////////////////////////////////////////////////////////////////////////
// Model
//
const model = {
  params: {
    videoCodec: '',
    profile: '',
    videoBitrate: '',
    bframes: '',
    audioCodec: '',
    audioBitrate: '',
    input: '',
    output: '',
  },
  log: '',
};
model.present = (data) => {
  Object.assign(model.params, data.params);
  model.log = data.log;
  state.render(model);
};

////////////////////////////////////////////////////////////////////////////////
// View
//
const view = {};
view.ready = model => {
  const { params } = model;
  return `
  <textarea rows="3" class="command-preview">ffmpeg ${params2ffmpeg(params)}</textarea>

  <p>
    <button id="input">Input</button>
    <input id="input-file" type="text" value="${params.input}" />
  </p>

  <p>
    <button id="output">Output</button>
    <input id="output-file" type="text" value="${params.output}" />
  </p>

  <table class="param-table">

    <tr>
      <td>
        <label for="videoCodec">Video Codec</label>
      </td>
      <td>
        <select id="videoCodec" name="videoCodec">
          <option value="" ${!params.videoCodec ? 'selected' : ''}></option>
          <option value="libx264" ${params.videoCodec === 'libx264' ? 'selected' : ''}>H.264/AVC</option>
          <option value="copy" ${params.videoCodec === 'copy' ? 'selected' : ''}>copy</option>
        </select>
      </td>
    </tr>

    <tr>
      <td>
        <label for="profile">H.264/AVC Profile</label>
      </td>
      <td>
        <select id="profile" name="profile">
          <option value="" ${!params.profile ? 'selected' : ''}></option>
          <option value="main" ${params.profile === 'main' ? 'selected' : ''}>Main</option>
          <option value="high" ${params.profile === 'high' ? 'selected' : ''}>High</option>
        </select>
      </td>
    </tr>

    <tr>
      <td>
        <label for="videoBitrate">Video Bitrate</label>
      </td>
      <td>
        <input type="text" id="videoBitrate" value="${params.videoBitrate}" />
      </td>
    </tr>

    <tr>
      <td>
        <label for="bframes">B-frames</label>
      </td>
      <td>
        <input type="text" id="bframes" value="${params.bframes}" />
      </td>
    </tr>

    <tr>
      <td>
        <label for="audioCodec">Audio Codec</label> 
      </td>
      <td>
        <select id="audioCodec" name="audioCodec">
          <option value="" ${!params.audioCodec ? 'selected' : ''}></option>
          <option value="aac" ${params.audioCodec === 'aac' ? 'selected' : ''}>AAC</option>
          <option value="copy" ${params.audioCodec === 'copy' ? 'selected' : ''}>copy</option>
        </select>
      </td>
    </tr>

    <tr>
      <td>
        <label for="audioBitrate">Audio Bitrate</label> 
      </td>
      <td>
        <input type="text" id="audioBitrate" value="${params.audioBitrate}" />
      </td>
    </tr>

  </table>

  <div>
    <button id="run">Run</button>
  </div>
  `;
};
view.done = model => `
  <textarea cols="100" rows="10">${model.log}</textarea>
`;
view.init = view.ready;
view.display = representation => {
  const stateRepresentation = document.getElementById('representation');
  stateRepresentation.innerHTML = representation;
};
view.display(view.init(model));

////////////////////////////////////////////////////////////////////////////////
// State
//
const state = { view };
model.state = state;
state.representation = model => {
  var representation = 'something is wrong...';

  if (!state.done(model)) {
    representation = state.view.ready(model);
  } else {
    representation = state.view.done(model);
  }

  state.view.display(representation);
};
state.done = model => {
  return !!model.log;
};
state.render = model => {
  state.representation(model);
};

////////////////////////////////////////////////////////////////////////////////
// Actions
//
const actions = {};
actions.updateParams = (data, present = model.present) => {
  present({ params: data });
};
actions.displayLog = (data, present = model.present) => {
  present({ log: data });
};


Observable.fromEvent(document.getElementById('representation'), 'click')
  .subscribe((e) => {
    const { target } = e;
    switch (target.id) {
      case 'run':
        runFfmpeg();
        break;
      case 'input':
        showInputDialog();
        break;
      case 'output':
        showOutputDialog();
        break;
      default:
        e.preventDefault();
    }
  });

Observable.fromEvent(document.getElementById('representation'), 'change')
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

function showInputDialog() {
  dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{
        name: 'Media files',
        extensions: ['mp4', 'avi', 'ts', 'm4s', 'mov', 'm4v', 'm4a'],
      }],
    }, files => {
      if (!files.length) return;
      actions.updateParams({ input: files[0] });
    });
}

function showOutputDialog() {
  dialog.showSaveDialog({
      title: 'Output',
      filters: [{
        name: 'Media files',
        extensions: ['mp4', 'avi', 'ts', 'm4s', 'mov', 'm4v', 'm4a'],
      }],
    }, file => {
      if (!file) return;
      actions.updateParams({ output: file });
    });
}

function runFfmpeg() {
  const cmd = `ffmpeg ${params2ffmpeg(model.params)}`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      actions.displayLog(err);
      return;
    } else if (stderr) {
      actions.displayLog(stderr);
      return;
    }
    actions.displayLog(stdout);
  });
}
