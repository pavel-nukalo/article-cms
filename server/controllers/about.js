const serviceModel = require('../models/service');

exports.about = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('about'),
      serviceModel.get('common')
    ]);

    res.render('about', { page, common });
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

    res.render('contact', { page, common });
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

    res.render('terms', { page, common });
  } catch (e) {
    res.status(404).render('404');
  }
};