import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      // CALL DB HERE

      return UserModel.findOne({ email, password })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: 'Incorrect email or password',
            });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        })
        .catch((err) => done(err));
    }
  )
);
