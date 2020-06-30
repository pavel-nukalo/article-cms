var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

var state = {
  db: null,
  client: null
};

exports.get = function () {
  return state.db;
};

exports.getClient = function () {
  return state.client;
};

exports.connect = function (done) {
  if (state.db) {
    return Promise.resolve();
  }

  var url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;

  var options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  return MongoClient.connect(url, options)
    .then(function (client) {
      state.client = client;
      state.db = client.db();
    });
};