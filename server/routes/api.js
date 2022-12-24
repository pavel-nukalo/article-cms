const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../middlewares/authentication');

const documentsController = require('../controllers/documents');
const staticFilesController = require('../controllers/static_files');

const authenticationRouter = require('./authentication');

router.use('/authentication', authenticationRouter);


router.post('/documents/get_many', authenticationMiddleware.check(), documentsController.getMany);

router.post('/documents/get', authenticationMiddleware.check(), documentsController.get);

router.post('/documents/update', authenticationMiddleware.check(), documentsController.update);

router.post('/documents/create', authenticationMiddleware.check(), documentsController.create);

router.post('/documents/delete', authenticationMiddleware.check(), documentsController.delete);

router.post('/static_files/upload', authenticationMiddleware.check(), staticFilesController.upload);

router.post('/static_files/delete', authenticationMiddleware.check(), staticFilesController.delete);

module.exports = router;