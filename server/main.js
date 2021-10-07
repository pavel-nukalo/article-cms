const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
require('./authentication/init');
const i18n = require('i18n');

const config = require('./config');
const db = require('./db');
const mainRouter = require('./routes/main');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

i18n.configure(Object.assign({}, config.i18n, { directory: './server/locales', objectNotation: true, updateFiles: false }));
app.use(i18n.init);

app.use(express.static('./server/public'));

const start = async () => {
  try {
    await db.connect();

    app.use(expressSession(Object.assign({}, config.expressSession, {
      store: new MongoStore({
        client: db.getClient(),
        dbName: config.mongodb.dbName
      })
    })));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(mainRouter);

    if (config.app && config.app.configure) config.app.configure(app);

    const httpServer = http.createServer(app);
    httpServer.listen(config.http.port, config.http.hostname, function () {
      console.log(`App listen http://${config.http.hostname}:${config.http.port}`);
    });

    if (config.https && config.https.enable) {
      const httpsOptions = {
        key: fs.readFileSync(config.https.ssl.key, 'utf8'),
        cert: fs.readFileSync(config.https.ssl.cert, 'utf8')
      };
      const httpsServer = https.createServer(httpsOptions, app);

      httpsServer.listen(config.https.port, config.https.hostname, function () {
        console.log(`App listen https://${config.https.hostname}:${config.https.port}`);
      });
    }
  } catch (err) {
    console.error(err);
  }
};

start();