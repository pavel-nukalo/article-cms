const db = require('../db');

exports.getMany = (collection, query, limit = 0, skip = 0, projection, sort) => db.get().collection(collection).find(query).project(projection).skip(skip).limit(limit).sort(sort).toArray();

exports.get = (collection, query, projection) => db.get().collection(collection).findOne(query, { projection });

exports.update = (collection, query, doc) => db.get().collection(collection).findOneAndUpdate(query, { $set: doc });

exports.create = async (collection, doc) => {
  const result = await db.get().collection(collection).insertOne(doc);
  return result.ops[0];
};

exports.delete = (collection, query) => db.get().collection(collection).deleteOne(query);