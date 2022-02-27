/* Subsequent require('mongoose') call. Not the first.
 ** The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 ** you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 ** On subsequent calls, it will return the same instance that was created and returned to you the first
 ** time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');

const User = mongoose.model('User');

const utils = require('../utils/auth');

// removed the next parameter since it wasn't used
const register = (req, res) => {
  const saltHash = utils.genPassword(req.body.password);

  const { salt, hash } = saltHash;

  // create a new user with the User Model
  const newUser = new User({
    username: req.body.username,
    hash,
    salt,
  });

  try {
    newUser.save().then((user) => {
      res.json({ success: true, user });
    });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
};

const login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'could not find user' });
      }

      // Function defined in utils
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );

      // if the passpord is valid, login and issue a JWT
      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: 'you entered the wrong password' });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// removed the next parameter since it wasn't used
const getProtected = (req, res) => {
  res.status(200).json({
    success: true,
    msg: 'You are successfully authenticated to this route!',
  });
};

module.exports.register = register;
module.exports.login = login;
module.exports.getProtected = getProtected;
