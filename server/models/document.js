const db = require('../db');

exports.getMany = (collection, query) => db.get().collection(collection).find(query).toArray();

exports.get = (collection, query) => db.get().collection(collection).findOne(query);

exports.update = (collection, query, doc) => db.get().collection(collection).findOneAndUpdate(query, { $set: doc });

exports.create = async (collection, doc) => {
  const result = await db.get().collection(collection).insertOne(doc);
  return result.ops[0];
};

exports.delete = (collection, query) => db.get().collection(collection).deleteOne(query);