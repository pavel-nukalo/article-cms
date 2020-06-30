var fs = require('fs');
var path = require('path');
var shelljs = require('shelljs');

var config = require('../config');

exports.upload = function (req, res) {
  new Promise(function (resolve, reject) {
    var directory = path.join(config.staticFilesDirectory, req.body.directory);

    fs.exists(directory, function (exists) {
      resolve({
        exists: exists,
        directory: directory
      });
    });
  })
    .then(function (data) {
      if (!data.exists) {
        shelljs.mkdir('-p', data.directory);
      }

      return data.directory;
    })
    .then(function (directory) {
      return new Promise(function (resolve, reject) {
        var data = req.body.content.replace(/^data:([A-Za-z-+\/]+);base64,/, '').replace('data:;base64,', '');
        var buffer = new Buffer(data, 'base64');

        var cb = function (err) {
          if (err) reject(err);
          else resolve();
        };

        if (req.body.append) {
          fs.appendFile(directory + req.body.name, buffer, cb);
        } else {
          fs.writeFile(directory + req.body.name, buffer, cb);
        }
      });
    })
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function () {
      res.sendStatus(500);
    });
};

exports.delete = function (req, res) {
  new Promise(function (resolve, reject) {
    shelljs.rm('-rf', path.join(config.staticFilesDirectory, req.body.path));

    resolve();
  })
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function () {
      res.sendStatus(500);
    });
};