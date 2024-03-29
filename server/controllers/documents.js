const documentModel = require('../models/document');

exports.getMany = async (req, res) => {
  try {
    const docs = await documentModel.getMany(req.body.collection, req.body.query, req.body.limit, req.body.skip, req.body.projection, req.body.sort);
    res.json(docs);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.get = async (req, res) => {
  try {
    const doc = await documentModel.get(req.body.collection, req.body.query, req.body.projection);
    res.json(doc);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    await documentModel.update(req.body.collection, req.body.query, req.body.doc);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  try {
    const doc = await documentModel.create(req.body.collection, req.body.doc);
    res.json(doc);
  } catch (e) {
    res.sendStatus(500);
  }
};

exports.delete = async (req, res) => {
  try {
    await documentModel.delete(req.body.collection, req.body.query);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
};