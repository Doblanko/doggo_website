const router = require('express').Router();
const passport = require('passport');

const userController = require('../controllers/userController');

/** passport.authenticate
 * By default, when authentication succeeds, the req.user property is set to the authenticated user,
 * a session is established, and the next function in the stack is called. We set session to false
 * to tell passport not to create a session.
 *
 * Below is the custom callback implementation
 */
const requireLogin = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json(info); // info contains the error message from the localStrategy
    } else {
      // if user authenticated, maintain the session
      // move onto the login function
      req.login(user);
    }
  })(req, res, next);
};

const requireAuth = passport.authenticate('jwt', { session: false });

// call passport.authenticate to make sure the user is logged in
router.get('/protected', requireAuth, userController.getProtected);

// Validate an existing user and issue a JWT
router.post('/login', requireLogin, userController.login);

// Register a new user
router.post('/register', userController.register);

module.exports = router;
