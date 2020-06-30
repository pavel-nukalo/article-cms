const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

const config = require('../config');

exports.upload = async (req, res) => {
  try {
    const { exists, directory } = await new Promise((resolve, reject) => {
      const directory = path.join(config.staticFilesDirectory, req.body.directory);
      fs.exists(directory, exists => resolve({ exists, directory }));
    });

    if (!exists) shelljs.mkdir('-p', directory);

    await new Promise((resolve, reject) => {
      const data = req.body.content.replace(/^data:([A-Za-z-+\/]+);base64,/, '').replace('data:;base64,', '');
      const buffer = new Buffer(data, 'base64');
      const cb = err => err ? reject(err) : resolve();

      if (req.body.append) fs.appendFile(directory + req.body.name, buffer, cb);
      else fs.writeFile(directory + req.body.name, buffer, cb);
    });

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  try {
    await new Promise(resolve => {
      shelljs.rm('-rf', path.join(config.staticFilesDirectory, req.body.path));
      resolve();
    });

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};