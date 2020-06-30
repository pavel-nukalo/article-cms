var serviceModel = require('../models/service');

exports.about = function (req, res) {
  Promise.all([
    serviceModel.get('about'),
    serviceModel.get('common')
  ])
    .then(function (data) {
      var doc = {
        page: data[0],
        common: data[1]
      };

      res.render('about.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.contact = function (req, res) {
  Promise.all([
    serviceModel.get('contact'),
    serviceModel.get('common')
  ])
    .then(function (data) {
      var doc = {
        page: data[0],
        common: data[1]
      };

      res.render('contact.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.terms = function (req, res) {
  Promise.all([
    serviceModel.get('terms'),
    serviceModel.get('common')
  ])
    .then(function (data) {
      var doc = {
        page: data[0],
        common: data[1]
      };

      res.render('terms.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};