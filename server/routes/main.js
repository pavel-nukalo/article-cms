var express = require('express');
var router = express.Router();

var config = require('../config');

var mainController = require('../controllers/main');
var aboutController = require('../controllers/about');
var articlesController = require('../controllers/articles');

var apiRouter = require('./api');

router.use('/admin', express.static('./client/admin/dist'));

router.use('/static_files', express.static(config.staticFilesDirectory));

router.use('/api', apiRouter);


router.get('/', mainController.index);

router.get('/articles/*', articlesController.article);

router.get('/articles', articlesController.index);

router.get('/search', mainController.search);

router.get('/about', aboutController.about);

router.get('/contact', aboutController.contact);

router.get('/terms', aboutController.terms);

router.get('/sitemap.xml', mainController.sitemap);

router.get('/robots.txt', mainController.robots);

router.get('/ads.txt', mainController.ads);

router.use(function (req, res) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('404.ejs');
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

module.exports = router;