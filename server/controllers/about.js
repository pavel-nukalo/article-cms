const serviceModel = require('../models/service');

exports.about = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('about'),
      serviceModel.get('common')
    ]);

    const doc = { page, common };

    res.render('about', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};

exports.contact = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('contact'),
      serviceModel.get('common')
    ]);

    const doc = { page, common };

    res.render('contact', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};

exports.terms = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('terms'),
      serviceModel.get('common')
    ]);

    const doc = { page, common };

    res.render('terms', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};