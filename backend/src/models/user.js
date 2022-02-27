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

// save the hashed password
// note that bcrypt appends the salt to the hashed string
UserSchema.pre('save', function (next) {
  const user = this;
  const SALT_FACTOR = 5;

  // Only run this function if password was modified (not on other update functions)
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

// check if the right password was entered
UserSchema.methods.comparePassword = async function compare(
  passwordAttempt,
  done
) {
  try {
    const isMatch = await bcrypt.compare(passwordAttempt, this.password);
    return done(null, isMatch);
  } catch (err) {
    return done(err, false);
  }
};

// create the user model and add it to the Singleton mongoose object
mongoose.model('User', UserSchema);
