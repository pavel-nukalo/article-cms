const serviceModel = require('../models/service');

exports.about = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('about'),
      serviceModel.get('common')
    ]);

    res.render('about.ejs', { page, common });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.contact = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('contact'),
      serviceModel.get('common')
    ]);

    res.render('contact.ejs', { page, common });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.terms = async (req, res) => {
  try {
    const [page, common] = await Promise.all([
      serviceModel.get('terms'),
      serviceModel.get('common')
    ]);

    res.render('terms.ejs', { page, common });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};