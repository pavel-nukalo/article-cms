const express = require('express');
const router = express.Router();

const passport = require('passport');

const documentsController = require('../controllers/documents');
const staticFilesController = require('../controllers/static_files');

const authenticationRouter = require('./authentication');

router.use('/authentication', authenticationRouter);


router.post('/documents/get_many', passport.authenticationMiddleware(), documentsController.getMany);

router.post('/documents/get', passport.authenticationMiddleware(), documentsController.get);

router.post('/documents/update', passport.authenticationMiddleware(), documentsController.update);

router.post('/documents/create', passport.authenticationMiddleware(), documentsController.create);

router.post('/documents/delete', passport.authenticationMiddleware(), documentsController.delete);

router.post('/static_files/upload', passport.authenticationMiddleware(), staticFilesController.upload);

// router.post('/static_files/delete', passport.authenticationMiddleware(), staticFilesController.delete);

module.exports = router;