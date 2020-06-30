var db = require('../db');

var collection = 'articles';

exports.get = function (parent, name) {
  return db.get().collection(collection).findOne({ parent, name })
    .then(function (result) {
      if (result) {
        return Promise.resolve(result);
      } else {
        var err = new Error (`Article Document with parent = ${parent} and name = ${name} is not in database!`);
        return Promise.reject(err);
      }
    });
};

exports.getAll = function () {
  return db.get().collection(collection).find().sort({ created: -1 }).toArray();
};

exports.getMany = function (query, limit) {
  return db.get().collection(collection).find(query).limit(limit).sort({ created: -1 }).toArray();
};

exports.getFamilyTree = function (pathArray) {
  return Promise.resolve()
    .then(function () {
      var promises = [];
      
      pathArray.forEach(function (item, i, arr) {
        var parent = arr.slice(0, i + 1).join('/');

        promises.push(
          db.get().collection(collection).find({ parent }).sort({ order: 1 }).toArray()
        );
      });
      
      return Promise.all(promises);  
    });
};

exports.increaseImpressions = function (_id) {
  return db.get().collection(collection).findOneAndUpdate({ _id }, { $inc: { 'statistics.impressions': 1 } });
};