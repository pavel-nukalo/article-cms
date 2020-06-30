var documentModel = require('../models/document');

exports.getMany = function (req, res) {
  documentModel.getMany(req.body.collection, req.body.query)
    .then(function (docs) {
      res.json(docs);
    })
    .catch(function () {
      res.sendStatus(500);
    });
};

exports.get = function (req, res) {
  documentModel.get(req.body.collection, req.body.query)
    .then(function (doc) {
      res.json(doc);
    })
    .catch(function() {
      res.sendStatus(500);
    });
};

exports.update = function (req, res) {
  documentModel.update(req.body.collection, req.body.query, req.body.doc)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function () {
      res.sendStatus(500);
    });
};

exports.create = function (req, res) {
  documentModel.create(req.body.collection, req.body.doc)
    .then(function (doc) {
      res.json(doc);
    })
    .catch(function () {
      res.sendStatus(500);
    });
};

exports.delete = function (req, res) {
  documentModel.delete(req.body.collection, req.body.query)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function () {
      res.sendStatus(500);
    });
};