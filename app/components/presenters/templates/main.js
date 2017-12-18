// @flow
const params2ffmpeg = require('../../../ffmpeg/params2ffmpeg');

const main/*: (model: Model) => string */ = model => {
  const { params } = model;
  if (!params) return '';
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

module.exports = main;
