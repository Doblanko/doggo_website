const express = require('express');
const cors = require('cors');
// Passport is a singleton object
const passport = require('passport');
// For saving files
const fileUpload = require('express-fileupload');

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
// Only need to call once for the whole file. It loads the env variables to the node process environment.
// Naming convenction is for the variables to be all caps
require('dotenv').config();

// Create the Express application
const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Must first load the models
require('./models/user');
require('./models/post');

// Pass the global passport object into the configuration function
// If you declare a variable in a file without using const/let and then assign a value to it, the
// global object will set a property for this variable that is what require without assigning to a variable does
require('./config/passport');

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows our React application to make HTTP requests to Express application
app.use(cors());

// default options for file upload
app.use(fileUpload());

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

/**
 * -------------- Error Handling ----------------
 * Define error-handling middleware functions in the same way as other
 * middleware functions, except error-handling functions have four arguments
 * instead of three: (err, req, res, next).
 *
 * You define error-handling middleware last, after other app.use() and routes
 * calls
 */
app.use((err, req, res, next) => {
  /**
   * If you call next() with an error after you have started writing the
   * response (for example, if you encounter an error while streaming the
   * response to the client) the Express default error handler closes the
   * connection and fails the request. So when you add a custom error handler,
   * you must delegate to the default Express error handler, when the headers
   * have already been sent to the client:
   */
  if (res.headersSent) {
    return next(err);
  }

  // The 'catch all' error handling function
  res.status(500);
  res.render('error', { error: err });
});

/**
 * -------------- SERVER ----------------
 */

// Server listens on port
app.listen(process.env.PORT);
