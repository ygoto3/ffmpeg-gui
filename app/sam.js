// @flow
const pageActions = require('./components/pageActions');
const main = require('./components/presenters/templates/main');
const done = require('./components/presenters/templates/done');

const state/*: State*/ = {
  render(model) {
    var representation = '';
    switch (model.page) {
      case 'main':
        representation = main(model);
        break;
      case 'done':
        representation = done(model);
        break;
    }
    return representation;
  }
};

const actions/*: Actions*/ = {
  page: null,
  goTo(page/*: string*/) {
    model.accept({ page });
    actions.page = pageActions[page](model, actions);
    actions.page.onLoad();
  },
  updateParams(params/*: FfmpegParams*/) {
    model.accept({ params });
  },
  updateLog(log/*: string*/) {
    model.accept({ log });
  }
};

const model/*: Model*/ = {
  page: '',
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
  accept(data/*: ModelData*/ = {}) {
    if (data.page) model.page = data.page;
    if (data.log) model.log = data.log;
    Object.assign(model.params, data.params);
    state.render(model);
  }
};

function init(render/*: (html: string) => void*/) {
  const _render = state.render;
  state.render = (...args) => {
    const representation = _render(...args);
    render(representation);
    return representation;
  }
}

module.exports = {
  state,
  actions,
  model,
  init,
};
