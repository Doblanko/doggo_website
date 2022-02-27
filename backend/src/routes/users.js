const router = require('express').Router();
const passport = require('passport');

const userController = require('../controllers/userController');

/** passport.authenticate
 * By default, when authentication succeeds, the req.user property is set to the authenticated user,
 * a session is established, and the next function in the stack is called. We set session to false
 * to tell passport not to create a session.
 */
const requireLogin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

// call passport.authenticate to make sure the user is logged in
router.get('/protected', requireAuth, userController.getProtected);

// Validate an existing user and issue a JWT
router.post('/login', requireLogin, userController.login);

// Register a new user
router.post('/register', userController.register);

module.exports = router;
