const pageActions = require('./components/pageActions');
const main = require('./components/presenters/templates/main');
const done = require('./components/presenters/templates/done');

const state = {
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

const actions = {
  goTo(page) {
    model.accept({ page });
    actions.page = pageActions[page](model, actions);
    actions.page.onLoad();
  },
  updateParams(params) {
    model.accept({ params });
  },
  updateLog(log) {
    model.accept({ log });
  }
};

const model = {
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
  accept(data = {}) {
    if (data.page) model.page = data.page;
    if (data.log) model.log = data.log; Object.assign(model.params, data.params);
    state.render(model);
  }
};

function init(render) {
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
