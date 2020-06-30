var articleModel = require('../models/article');
var serviceModel = require('../models/service');
var userModel = require('../models/user');

exports.index = function (req, res) {
  Promise.all([
    serviceModel.get('common'),
    serviceModel.get('allArticles'),
    articleModel.getMany({ 'metadata.type': 'basic-article' }, 0)
  ])
    .then(function (data) {
      var doc = {
        common: data[0],
        page: data[1],
        articles: data[2],
        query: req.query
      };

      res.render('articles.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};

exports.article = function (req, res) {
  var doc = {
    pathArray: [''].concat(req.path.split('/').slice(2)),
    query: req.query
  };

  Promise.all([
    serviceModel.get('common'),
    articleModel.get(doc.pathArray.slice(0, -1).join('/'), doc.pathArray[doc.pathArray.length - 1])
  ])
    .then(function (data) {
      doc.common = data[0];
      doc.page = data[1];
      
      return Promise.all([
        articleModel.getFamilyTree(doc.pathArray),
        articleModel.increaseImpressions(doc.page._id),
        userModel.get(doc.page.metadata.author.user_id)
      ]);
    })
    .then(function (data) {
      doc.familyTree = data[0];
      doc.author = data[2];

      res.render('article.ejs', doc);
    })
    .catch(function () {
      res.status(404).render('404.ejs');
    });
};