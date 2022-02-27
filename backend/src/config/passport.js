const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// mongoose was required before. The first time require('mongoose') is called it creates an instance of the mongoose class and returns it. On subsequent calls, it will return the same instance that was created and retured to you the first time because of how module import/export works in ES6.
const User = require('mongoose').model('User');

/*
A list of all possible options

const allPjassportJWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY || secret phrase,
  issuer: 'enter issuer here',
  audience: 'enter audience here',
  algorithms: ['RS256'], RS256 for aysmmetric key, HS256 for a symmetric key
  ignoreExpiration: false,
  jsonWebTokenOptions: {
    complete: false,
    clockTolerance: '',
    maxAge: '2d', // 2days
    clockTimestamp: '100',
    nonse: 'string here for OpenId'
  }
}
*/

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
// Secret chosen in this case
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  usernameField: 'username',
  passwordField: 'password',
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // the JWTStrategy will verify the token
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, function verify(jwtPayload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      User.findOne({ _id: jwtPayload.sub }, function cb(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        // didn't find a user, no error
        return done(null, false);
      });
    })
  );
};
