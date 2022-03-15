const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/** passport.authenticate
 * By default, when authentication succeeds, the req.user property is set to the authenticated user,
 * a session is established, and the next function in the stack is called. We set session to false
 * to tell passport not to create a session.
 *
 * Below is the custom callback implementation for both localstrategy and jwt
 * Structure an be found in the source code for passport authenticate on github
 * A note:
 * You can remove that (req,res) at the bottom if you also remove the (req,res) => at the top.
 * authenticate() returns a middleware that expects the regular arguments of (req, res, next).
 * So you are supposed to pass that returned function to the route directly. If you don't then you must
 * call the return function yourself which is what the (req,res) at the bottom is doing - it is calling the return value of authenticate()
 */
function requireLogin(req, res, next) {
  // passport.authenticate callback is an (err, user, info) function. No req, res, or next, because you're supposed to get them from the closure.
  passport.authenticate('local', { session: false }, (err, user, info) => {
    // catches fundamental code breaking errors
    if (err) {
      return next(err);
    }
    // This catches errors in token validation that weren't code breaking in the validation code (incorrect username/password, etc).
    // info contains the error message from the Strategy (either built in or user defined custom)
    if (info) {
      return res.status(401).json(info);
    }
    // catches error of user no longer existing or not found
    // don't actually need this since we have a custom error message set and the info will catch this error above
    if (!user) {
      res.status(401).json(info);
    } else {
      // if user authenticated, apply the user to the request
      // move onto the login function
      req.user = user;
      next();
    }
  })(req, res, next); // normally (req, res, next) are intercepted by default, but you need to manually IIFE this with parameters with custom callback
}

function requireAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // catches fundamental code breaking errors
    if (err) {
      next(err);
    }
    // info contains the message sent as the third parameter in done(err, user, info) in the strategy definition
    // This catches errors in token validation that weren't code breaking in the validation code (token expired, invalid token, etc).
    // don't actually need this since we have a custom error message set and the info will catch this error above
    if (info) {
      return res.status(401).json(info);
    }
    // catches error of user no longer existing or not found
    if (!user) {
      res.status(401).json(info);
    } else {
      // successful authentication
      // if user authenticated, apply the user to the requst
      // move on to the protected route
      // recommended to actually use req.login for sessions (this is not a session)
      req.user = user;
      next();
    }
  })(req, res, next); // passport.authenticate returns a middleware. Normally (req, res, next) are intercepted by default, but you need to manually IIFE this with parameters with custom callback.
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 * expiresIn: Note that javascript uses ms for time since EPOC, jsonwebtoken uses seconds. Need to convert.
 */
function issueJWT(user) {
  // pull the _id from the user
  const { _id } = user;

  const expiresIn = process.env.JWT_EXPIRY;

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
  };

  // RS256 for aysmmetric key, HS256 for a symmetric key
  // Using a symmetric key
  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}

module.exports.requireLogin = requireLogin;
module.exports.requireAuth = requireAuth;
module.exports.issueJWT = issueJWT;
