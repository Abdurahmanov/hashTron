import { app, BrowserWindow } from 'electron' // eslint-disable-line
// import vkflow from 'vkflow';
import express from 'express';
import bodyParse from 'body-parser';
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const expressServer = express();
const server = require('http').createServer(expressServer);
const io = require('socket.io')(server);
const dbPath = path.resolve(__dirname, 'hashTron.db');
// const knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: dbPath,
//   },
// });

const { VKWebSocket } = require('vkflow');
const { authWithToken, flushRules, postRule } = require('vkflow').VKStreamingAPI;


expressServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

expressServer.use(bodyParse.urlencoded({ extended: false }));
expressServer.use(bodyParse.json());

server.listen(3000);

let rules = [];

let newData = '';

const VK_SERVICE_KEY = 'd6b72f18d6b72f18d6b72f1862d6df0310dd6b7d6b72f188ae535400a0ddc1f3581ad6a';
// let newsFlow;
let point;
let keys;
(async () => {
  const { endpoint, key } = await authWithToken(VK_SERVICE_KEY);
  point = endpoint;
  keys = key;

  const db = new sqlite3.Database(dbPath);

  const sql = 'select title from Category';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.log(err.message);
    }
    rows.forEach((row) => {
      rules = rules.concat({ value: row.title, tag: row.title });
    });

    return console.log(rules);
  });

  db.close();

  await flushRules(point, keys);

  for (const rule of rules) { // eslint-disable-line
    await postRule(point, keys, { rule }); // eslint-disable-line
  }

  const newsFlow = new VKWebSocket(`wss://${endpoint}/stream?key=${key}`);

  newsFlow.on('data', (data) => {
    newData = JSON.parse(data);
  });
})();

const vkWs = async () => {
  await flushRules(point, keys);

  for (const rule of rules) { // eslint-disable-line
    await postRule(point, keys, { rule }); // eslint-disable-line
  }
};

io.on('connection', (socket) => {
  const news = setInterval(() => {
    socket.emit('news', newData);
  }, 5000);

  socket.on('disconnect', () => {
    clearInterval(news);
  });
});

expressServer.post('/news', (req, res) => {
  rules = rules.concat({ value: req.body.tag, tag: req.body.tag });
  vkWs();
  return res.send(rules);
});

expressServer.post('/favorites', (req, res) => { // eslint-disable-line
  const { item } = req.body;
  const db = new sqlite3.Database(dbPath);
  const sql = `Insert into Favorites(idTag,text,date,ownerId,imagePath,preview,idAuthor,source,socialNetwork) 
  values(?,?,?,?,?,?,?,?,?)`;
  const params = [1, item.text, item.date, item.ownerId, item.photo, item.preview, 1, item.author,
    item.socialNetwork];
  db.run(sql, params, (err) => {
    if (err) {
      return res.send(err.message);
    }
    return res.send(item);
  });

  db.close();
});

expressServer.get('/getFavorites', (req, res) => {
  const db = new sqlite3.Database(dbPath);

  const sql = 'select idTag,text,date,ownerId,imagePath,preview,idAuthor,source,socialNetwork from Favorites';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.send(err.message);
    }
    let favorites = [];
    rows.forEach((row) => {
      favorites = favorites.concat(row);
    });
    return res.send(favorites);
  });

  db.close();
});

expressServer.post('/category', (req, res) => { // eslint-disable-line
  const { tag } = req.body;
  const db = new sqlite3.Database(dbPath);
  db.run('Insert into Category(title) values(?)', [tag], (err) => {
    if (err) {
      return res.send(err.message);
    }

    return res.send(tag);
  });

  db.close();
});

expressServer.get('/getCategory', (req, res) => {
  const db = new sqlite3.Database(dbPath);

  const sql = 'select title, id from Category';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.send(err.message);
    }
    let category = [];
    rows.forEach((row) => {
      category = category.concat({ id: row.id, title: row.title });
    });
    return res.send(category);
  });

  db.close();
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

