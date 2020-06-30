var db = require('../db');

exports.getMany = function (collection, query) {
  return db.get().collection(collection).find(query).toArray();
};

exports.get = function (collection, query) {
  return db.get().collection(collection).findOne(query);
};

exports.update = function (collection, query, doc) {
  return db.get().collection(collection).findOneAndUpdate(query, { $set: doc });
};

exports.create = function (collection, doc) {
  return db.get().collection(collection).insertOne(doc)
    .then(function (result) {
      return result.ops[0];
    });
};

exports.delete = function (collection, query) {
  return db.get().collection(collection).deleteOne(query);
};