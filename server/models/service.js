var db = require('../db');

var collection = 'service';

exports.get = function (name) {
  return db.get().collection(collection).findOne({ name })
    .then(function (result) {
      if (result) {
        return Promise.resolve(result);
      } else {
        var err = new Error (`Service Document with name = ${name} is not in database!`);
        return Promise.reject(err);
      }
    });
};