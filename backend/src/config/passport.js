const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');

/**
 * Subsequent require('mongoose') call. Not the first.
 * The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 * you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 * On subsequent calls, it will return the same instance that was created and returned to you the first
 * time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');

const User = mongoose.model('User');

// Change the name of the username and password field that LocalStrategy looks for to parse
const localOptions = {
  usernameField: 'username',
  passwordField: 'password',
};

const localLogin = new LocalStrategy(
  localOptions,
  // Here is the function that is supplied with the username and password field from the login POST request that is parsed by passport
  function verify(username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      /**
       * The callback function expects two values:
       *
       * 1. Err
       * 2. User
       *
       * If we don't find a user in the database, that doesn't mean there is an application error,
       * so we use `null` for the error value, and `false` for the user value
       *
       * The third parameter is the custom failure message sent.
       */
      // The user wasn't found. Likely an incorrect username.
      if (!user) {
        return done(null, false, {
          message: 'Login failed. Please try again.',
        });
      }

      // make sure the password is correct
      user.comparePassword(password, function (err2, isMatch) {
        // error comparing password
        if (err2) {
          return done(err2, false);
        }
        // password successfully compared
        // password didn't match
        if (!isMatch) {
          return done(null, false, {
            message: 'Login failed. Please try again.',
          });
        }
        // password matched
        // user authenticated and will be attached to the request
        return done(null, user);
      });
    });
  }
);

/** A list of all possible options
 * const allPassportJWTOptions = {
 *   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),      // where the token can be found
 *   secretOrKey: PUB_KEY || secret phrase,
 *   issuer: 'enter issuer here',
 *   audience: 'enter audience here',
 *   algorithms: ['RS256'], RS256 for aysmmetric key, HS256 for a symmetric key
 *   ignoreExpiration: false,
 *   jsonWebTokenOptions: {
 *     complete: false,
 *     clockTolerance: '',
 *     maxAge: '2d', // 2days
 *     clockTimestamp: '100',
 *     nonse: 'string here for OpenId'
 *   }
 * }
 */

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
// Secret chosen in this case
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
};

// the JWTStrategy will verify the JWT token for you
// The JWT payload is passed into the verify callback
const jwtAuth = new JwtStrategy(jwtOptions, function verify(jwtPayload, done) {
  // We will assign the `sub` property on the JWT to the database ID of user
  User.findOne({ _id: jwtPayload.sub }, function (err, user) {
    if (err) {
      // error finding user
      return done(err, false);
    }
    if (user) {
      // successfully found a user
      // will eventually attach user to the req object in the background
      return done(null, user);
    }
    // didn't find a user, no error
    return done(null, false, { message: 'The user no longer exists.' });
  });
});

// make sure passport uses the two strategies
passport.use(localLogin);
passport.use(jwtAuth);
