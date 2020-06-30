var ObjectID = require('mongodb').ObjectID;

var db = require('../db');

var collection = 'users';

exports.get = function (user_id) {
  return db.get().collection(collection).findOne({ _id: ObjectID(user_id) });
};

exports.update = function (user_id, user) {
  return db.get().collection(collection).findOneAndUpdate({ _id: ObjectID(user_id) }, { $set: user });
};

exports.getUserByCredentials = function (email, password) {
  return db.get().collection(collection).findOne({ email: email, password: password });
};