const router = require('express').Router();
const utils = require('../utils');

const userController = require('../controllers/userController');

router.get('/protected', utils.requireAuth, userController.getProtected);

// Validate an existing user and issue a JWT
router.post('/login', utils.requireLogin, userController.login);

// Register a new user
router.post('/register', userController.register);

module.exports = router;
