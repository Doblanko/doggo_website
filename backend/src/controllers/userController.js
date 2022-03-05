/**
 * Subsequent require('mongoose') call. Not the first.
 * The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 * you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 * On subsequent calls, it will return the same instance that was created and returned to you the first
 * time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');

const User = mongoose.model('User');

const utils = require('../utils');

// removed the next parameter since it wasn't used
const register = (req, res) => {
  // create a new user with the User Model
  // the model will hash the password with the pre hook
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser
    .save()
    .then((user) => {
      res.json({ success: true, user });
    })
    .catch((err) => {
      res.json({ success: false, message: err.message });
    });
};

// removed the next parameter since it wasn't used
const login = (req, res) => {
  const tokenObject = utils.issueJWT(req.user);
  res.status(200).json({
    success: true,
    token: tokenObject.token,
    expires: tokenObject.expires,
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
