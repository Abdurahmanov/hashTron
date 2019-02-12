import { app, BrowserWindow } from 'electron' // eslint-disable-line
import vkflow from 'vkflow';
import express from 'express';
const kek = express();

kek.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


kek.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


const VK_SERVICE_KEY = 'd6b72f18d6b72f18d6b72f1862d6df0310dd6b7d6b72f188ae535400a0ddc1f3581ad6a';

const animalsFlow = vkflow(
  VK_SERVICE_KEY,
  [{ value: 'кот', tag: 'cats' },
    { value: 'собака', tag: 'dogs' },
    { value: 'попугай', tag: 'parrots' },
    { value: 'xiaomi', tag: 'xiaomi' },
    { value: 'samsung', tag: 'samsung' },
    { value: 'apple', tag: 'apple' },
  ],
);

let newData = '';

animalsFlow.on('data', (data) => {
  newData = data;
});


kek.get('/test', (req, res) => {
  res.json(newData);
});

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    fullscreen: true,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

