const router = require('express').Router();
const utils = require('../utils');

const postController = require('../controllers/postController');

router.post('/upload', utils.requireAuth, postController.savePost);

module.exports = router;
