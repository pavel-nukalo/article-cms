var path = require('path');
var ejs = require('ejs');

var articleModel = require('../models/article');
var serviceModel = require('../models/service');

exports.index = function (req, res) {
  Promise.all([
    serviceModel.get('common'),
    serviceModel.get('index'),
    articleModel.getMany({ 'metadata.type': 'basic-article' }, 6)
  ])
    .then(function (data) {
      var doc = {
        common: data[0],
        page: data[1],
        articles: data[2]
      };

      res.render('index.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.search = function (req, res) {
  var searchQuery = decodeURIComponent(req.query.q);
  
  Promise.all([
    serviceModel.get('common'),
    serviceModel.get('search'),
    articleModel.getMany({ $text: { $search: searchQuery } }, 24)
  ])
    .then(function (data) {
      var doc = {
        common: data[0],
        page: data[1],
        articles: data[2],
        searchQuery: searchQuery
      };

      res.render('search.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.sitemap = function (req, res) {
  Promise.all([
    serviceModel.get('common'),
    serviceModel.get('index'),
    serviceModel.get('about'),
    serviceModel.get('contact'),
    serviceModel.get('terms'),
    articleModel.getAll()
  ])
    .then(function (data) {
      return new Promise(function (resolve, reject) {
        var doc = {
          common: data[0],
          index: data[1],
          about: data[2],
          contact: data[3],
          terms: data[4],
          articles: data[5]
        };

        ejs.renderFile(path.join(__dirname, '../views/sitemap.xml.ejs'), doc, function (err, xml) {
          if (err) {
            reject(err);
            return;
          }

          resolve(xml);
        });
      });
    })
    .then(function (xml) {
      res.setHeader('Content-Type', 'text/xml');
      res.end(xml);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.robots = function (req, res) {
  serviceModel.get('robots')
    .then(function (data) {
      return new Promise(function (resolve, reject) {
        var doc = {
          robots: data
        };

        ejs.renderFile(path.join(__dirname, '../views/robots.txt.ejs'), doc, function (err, txt) {
          if (err) {
            reject(err);
            return;
          }

          resolve(txt);
        });
      });
    })
    .then(function (txt) {
      res.setHeader('Content-Type', 'text/plain');
      res.end(txt);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.ads = function (req, res) {
  serviceModel.get('ads')
    .then(function (data) {
      return new Promise(function (resolve, reject) {
        var doc = {
          ads: data
        };

        ejs.renderFile(path.join(__dirname, '../views/ads.txt.ejs'), doc, function (err, txt) {
          if (err) {
            reject(err);
            return;
          }

          resolve(txt);
        });
      });
    })
    .then(function (txt) {
      res.setHeader('Content-Type', 'text/plain');
      res.end(txt);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};