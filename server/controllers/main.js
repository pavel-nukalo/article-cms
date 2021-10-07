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
      articleModel.getMany({ 'metadata.type': 'basic-article', 'metadata.status': 'published' }, config.pagination.limit)
    ]);

    const doc = { 
      common, 
      page, 
      articles 
    };

    res.render('index', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};

exports.search = async (req, res) => {
  try {
    const searchQuery = decodeURIComponent(req.query.q || '');

    const [common, page, articles] = await Promise.all([
      serviceModel.get('common'),
      serviceModel.get('search'),
      articleModel.getMany({ $text: { $search: searchQuery }, 'metadata.status': 'published' }, config.pagination.limit)
    ]);

    const doc = { 
      common, 
      page, 
      articles, 
      searchQuery 
    };

    res.render('search', doc);
  } catch (e) {
    res.status(404).render('404');
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
      articleModel.getMany({ 'metadata.status': 'published' }, 0, 0, { content: 0 })
    ]);

    const doc = {
      common,
      index,
      about,
      contact,
      terms,
      articles
    };

    res.setHeader('Content-Type', 'text/xml');
    res.render('sitemap_xml', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};

exports.robots = async (req, res) => {
  try {
    const robots = await serviceModel.get('robots');

    const doc = { robots };

    res.setHeader('Content-Type', 'text/plain');
    res.render('robots_txt', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};

exports.ads = async (req, res) => {
  try {
    const ads = await serviceModel.get('ads');

    const doc = { ads };

    res.setHeader('Content-Type', 'text/plain');
    res.render('ads_txt', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};