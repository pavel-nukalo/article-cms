const db = require('../db');
const collection = 'service';

exports.get = async name => {
  const result = await db.get().collection(collection).findOne({ name });

  if (result) {
    return result;
  } else {
    throw new Error(`Service Document with name = ${name} is not in database!`);
  }
};