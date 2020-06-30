const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

const state = {
  db: null,
  client: null
};

exports.get = () => state.db;

exports.getClient = () => state.client;

exports.connect = async () => {
  if (state.db) return;

  const url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  const client = await MongoClient.connect(url, options);
  state.client = client;
  state.db = client.db();
};