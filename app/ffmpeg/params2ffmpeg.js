const negate = require('../fp/composers/negate');
const isEmpty = require('../fp/predicates/isEmpty');

function params2ffmpeg(params) {
  const paramArr = [];
  paramArr.push(toInput(params));
  paramArr.push(toVideoCodec(params));
  paramArr.push(toProfile(params));
  paramArr.push(toVideoBitrate(params));
  paramArr.push(toBframes(params));
  paramArr.push(toAudioCodec(params));
  paramArr.push(toAudioBitrate(params));
  paramArr.push(toOutput(params));

  return paramArr.filter(negate(isEmpty)).join(' ');
}

function toVideoCodec(params) {
  return !!params.videoCodec ? `-vcodec ${params.videoCodec}` : '';
}

function toProfile(params) {
  return !!params.profile ? `-profile:v ${params.profile}` : '';
}

function toVideoBitrate(params) {
  return !!params.videoBitrate ? `-b:v ${params.videoBitrate}` : '';
}

function toBframes(params) {
  return !!params.bframes ? `-bf ${params.bframes}` : '';
}

function toAudioCodec(params) {
  return !!params.audioCodec ? `-acodec ${params.audioCodec}` : '';
}

function toAudioBitrate(params) {
  return !!params.audioBitrate ? `-b:a ${params.audioBitrate}` : '';
}

function toInput(params) {
  return !!params.input ? `-i ${params.input}` : '';
}

function toOutput(params) {
  return !!params.output ? `${params.output}` : '';
}

module.exports = params2ffmpeg;
