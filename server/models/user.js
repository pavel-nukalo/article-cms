const { ObjectID } = require('mongodb');
const db = require('../db');
const collection = 'users';

exports.get = user_id => db.get().collection(collection).findOne({ _id: ObjectID(user_id) });

exports.update = (user_id, user) => db.get().collection(collection).findOneAndUpdate({ _id: ObjectID(user_id) }, { $set: user });

exports.getUserByCredentials = (email, password) => db.get().collection(collection).findOne({ email, password });