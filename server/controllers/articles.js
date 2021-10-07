const config = require('../config');
const articleModel = require('../models/article');
const serviceModel = require('../models/service');
const userModel = require('../models/user');

exports.index = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.page || '1');

    if (isNaN(pageNumber)) throw new Error('Page number must be integer');

    const [common, page, articles, count] = await Promise.all([
      serviceModel.get('common'),
      serviceModel.get('allArticles'),
      articleModel.getMany({ 'metadata.type': 'basic-article', 'metadata.status': 'published' }, config.pagination.limit, (pageNumber - 1) * config.pagination.limit, { content: 0 }),
      articleModel.getCount({ 'metadata.type': 'basic-article', 'metadata.status': 'published' })
    ]);

    const doc = {
      pagination: config.pagination,
      pageNumber,
      count,
      common,
      page,
      articles
    };

    res.render('articles', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};

exports.article = async (req, res) => {
  try {
    const pathArray = [''].concat(req.path.split('/').slice(2));

    const [common, page] = await Promise.all([
      serviceModel.get('common'),
      articleModel.get(pathArray.slice(0, -1).join('/'), pathArray[pathArray.length - 1])
    ]);

    const [author, familyTree] = await Promise.all([
      userModel.get(page.metadata.author.user_id),
      articleModel.getFamilyTree(pathArray, { content: 0 }),
      articleModel.increaseImpressions(page._id)
    ]);

    const doc = {
      pathArray,
      common,
      page,
      familyTree,
      author
    };

    res.render('article', doc);
  } catch (e) {
    res.status(404).render('404');
  }
};