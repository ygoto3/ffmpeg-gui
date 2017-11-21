'use strict';
const electron = require('electron');
const { app, BrowserWindow } = electron;

var mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
