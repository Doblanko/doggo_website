const router = require('express').Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  userController.getProtected
);

// Validate an existing user and issue a JWT
router.post('/login', userController.login);

// Register a new user
router.post('/register', userController.register);

module.exports = router;
