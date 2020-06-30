const config = require('../config');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const MongoClient = require('mongodb').MongoClient;

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const start = async () => {
  const url = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db();

  const files = await readdir(path.join(__dirname, './db_samples/service'));
  const promises = files.map(async file => {
    const data = await readFile(path.join(__dirname, './db_samples/service', file), 'utf-8');
    return JSON.parse(data);
  });
  const docs = await Promise.all(promises);

  await db.createCollection('service');
  await db.collection('service').drop();
  await db.collection('service').insertMany(docs);
  await db.createCollection('articles');
  await db.collection('articles').createIndex({ name: 'text', articleName: 'text', description: 'text' });

  await client.close();

  console.log('DB was successfully initialized!');
};

start();