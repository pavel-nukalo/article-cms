const db = require('../db');
const collection = 'articles';

exports.get = async (parent, name) => {
  const result = await db.get().collection(collection).findOne({ parent, name });

  if (result) {
    return result;
  } else {
    throw new Error(`Article Document with parent = ${parent} and name = ${name} is not in database!`);
  }
};

exports.getCount = query => db.get().collection(collection).find(query).count();

exports.getMany = (query, limit = 0, skip = 0, projection) => db.get().collection(collection).find(query).project(projection).skip(skip).limit(limit).sort({ 'metadata.created': -1 }).toArray();

exports.getFamilyTree = (pathArray, projection) => {
  return Promise.resolve()
    .then(() => {
      const promises = [];

      pathArray.forEach((item, i, arr) => {
        const parent = arr.slice(0, i + 1).join('/');

        promises.push(
          db.get().collection(collection).find({ parent }).project(projection).sort({ order: 1 }).toArray()
        );
      });

      return Promise.all(promises);
    });
};

exports.increaseImpressions = _id => db.get().collection(collection).findOneAndUpdate({ _id }, { $inc: { 'statistics.impressions': 1 } });