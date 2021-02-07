const path = require('path');
const ejs = require('ejs');

const config = require('../config');
const articleModel = require('../models/article');
const serviceModel = require('../models/service');

exports.index = async (req, res) => {
  try {
    const [common, page, articles] = await Promise.all([
      serviceModel.get('common'),
      serviceModel.get('index'),
      articleModel.getMany({ 'metadata.type': 'basic-article' }, config.pagination.limit)
    ]);

    res.render('index.ejs', { common, page, articles });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.search = async (req, res) => {
  try {
    const searchQuery = decodeURIComponent(req.query.q || '');

    const [common, page, articles] = await Promise.all([
      serviceModel.get('common'),
      serviceModel.get('search'),
      articleModel.getMany({ $text: { $search: searchQuery } }, config.pagination.limit)
    ]);

    res.render('search.ejs', { common, page, articles, searchQuery });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.sitemap = async (req, res) => {
  try {
    const [common, index, about, contact, terms, articles] = await Promise.all([
      serviceModel.get('common'),
      serviceModel.get('index'),
      serviceModel.get('about'),
      serviceModel.get('contact'),
      serviceModel.get('terms'),
      articleModel.getMany({}, 0, 0, { content: 0 })
    ]);

    const xml = await new Promise((resolve, reject) => {
      const doc = {
        common,
        index,
        about,
        contact,
        terms,
        articles
      };

      ejs.renderFile(path.join(__dirname, '../views/sitemap.xml.ejs'), doc, (err, xml) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(xml);
      });
    });

    res.setHeader('Content-Type', 'text/xml');
    res.end(xml);
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.robots = async (req, res) => {
  try {
    const robots = await serviceModel.get('robots');

    const txt = await new Promise((resolve, reject) => {
      const doc = { robots };

      ejs.renderFile(path.join(__dirname, '../views/robots.txt.ejs'), doc, function (err, txt) {
        if (err) {
          reject(err);
          return;
        }

        resolve(txt);
      });
    });

    res.setHeader('Content-Type', 'text/plain');
    res.end(txt);
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.ads = async (req, res) => {
  try {
    const ads = await serviceModel.get('ads');

    const txt = await new Promise((resolve, reject) => {
      const doc = { ads };

      ejs.renderFile(path.join(__dirname, '../views/ads.txt.ejs'), doc, function (err, txt) {
        if (err) {
          reject(err);
          return;
        }

        resolve(txt);
      });
    });

    res.setHeader('Content-Type', 'text/plain');
    res.end(txt);
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};