const articleModel = require('../models/article');
const serviceModel = require('../models/service');
const userModel = require('../models/user');

exports.index = async (req, res) => {
  try {
    const [common, page, articles] = await Promise.all([
      serviceModel.get('common'),
      serviceModel.get('allArticles'),
      articleModel.getMany({ 'metadata.type': 'basic-article' }, 0)
    ]);

    res.render('articles.ejs', {
      common,
      page,
      articles,
      query: req.query
    });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};

exports.article = async (req, res) => {
  try {
    const pathArray = [''].concat(req.path.split('/').slice(2));

    const [common, page] = await Promise.all([
      serviceModel.get('common'),
      articleModel.get(pathArray.slice(0, -1).join('/'), pathArray[pathArray.length - 1])
    ]);

    const [familyTree, , author] = await Promise.all([
      articleModel.getFamilyTree(pathArray),
      articleModel.increaseImpressions(page._id),
      userModel.get(page.metadata.author.user_id)
    ]);

    res.render('article.ejs', {
      pathArray,
      common,
      page,
      familyTree,
      author,
      query: req.query
    });
  } catch (e) {
    res.status(404).render('404.ejs');
  }
};