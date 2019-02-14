import { app, BrowserWindow } from 'electron' // eslint-disable-line
import vkflow from 'vkflow';
import express from 'express';
import bodyParse from 'body-parser';
const expressServer = express();
const server = require('http').createServer(expressServer);
const io = require('socket.io')(server);
// const { VKWebSocket } = vkflow;
// const { authWithToken, flushRules, postRule } = vkflow.VKStreamingAPI;

expressServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

expressServer.use(bodyParse.urlencoded({ extended: false }));
expressServer.use(bodyParse.json());

server.listen(3000);

let flowTag = '';

const VK_SERVICE_KEY = 'd6b72f18d6b72f18d6b72f1862d6df0310dd6b7d6b72f188ae535400a0ddc1f3581ad6a';

// const vkWS = async (tag) => {
//   const { endpoint, key } = await authWithToken(VK_SERVICE_KEY);

//   await flushRules(endpoint, key);

//   await postRule(endpoint, key, { tag });


//   const socketWs = new VKWebSocket(
//     `wss://${endpoint}/stream?key=${key}`,
//     { socket: { omitServiceMessages: false } },
//   );

//   let newData = '';

//   socketWs.on('data', (data) => {
//     console.log(data);
//     newData = JSON.parse(data);
//   });

//   io.on('connection', (socket) => {
//     const news = setInterval(() => {
//       socket.emit('news', newData);
//     }, 5000);

//     socket.on('disconnect', () => {
//       clearInterval(news);
//     });
//   });
// };

const vkWs = (tag) => {
  const newsFlow = vkflow(
    VK_SERVICE_KEY,
    [{ value: 'js', tag: 'js' },
      { value: 'css', tag: 'css' }, tag],
  );

  let newData = '';

  newsFlow.on('data', (data) => {
    newData = JSON.parse(data);
  });

  io.on('connection', (socket) => {
    const news = setInterval(() => {
      socket.emit('news', newData);
    }, 5000);

    socket.on('disconnect', () => {
      clearInterval(news);
    });
  });
};

expressServer.post('/news', (req, res) => {
  flowTag = { value: req.body.tag, tag: req.body.tag };
  vkWs(flowTag);
  res.send('ok');
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

