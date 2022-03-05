/**
 * Subsequent require('mongoose') call. Not the first.
 * The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 * you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 * On subsequent calls, it will return the same instance that was created and returned to you the first
 * time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Function that runs before a save action
 * Hash the password and save it
 * Note that bcrypt appends the salt to the hashed string instead of storing it
 * separately
 * Callback has to be a normal function because it needs proper 'this' context
 * of the document calling it
 */
UserSchema.pre('save', function (next) {
  // rename 'this' to user to make it more clear
  const user = this;
  const SALT_FACTOR = 5;

  // Only run this function if password was modified (not on other update
  // functions)
  // maybe only the username was updated
  if (!user.isModified('password')) {
    return next();
  }

  // generate salt and hash the password in one step
  bcrypt.hash(user.password, SALT_FACTOR, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

/** Error handler
 * Mongoose error handlers are made using post middleware. To mark post
 * middleware as an error handler, you need to make it take 3 parameters.
 *
 * Error handling middleware only gets called if an error occured in a pre hook,
 * if save throws an error, or if a previous post hook called next() with an
 * error.
 *
 */
UserSchema.post('save', function (err, doc, next) {
  /** Handle duplicate key error
   * Converts a MongoDB specific errors (like duplicate key) as well as
   * mongoose specific errors (like validation erros) into something that makes
   * sense for the application
   */
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return next(new Error('There was a duplicate key error'));
  }
  next(err);
});

// check if the right password was entered
UserSchema.methods.comparePassword = async function compare(
  passwordAttempt,
  done
) {
  try {
    // password compared successfully (no error, could match or not match)
    const isMatch = await bcrypt.compare(passwordAttempt, this.password);
    return done(null, isMatch);
  } catch (err) {
    // error comparing password
    return done(err, false);
  }
};

// create the user model and add it to the Singleton mongoose object
mongoose.model('User', UserSchema);
