/* First time mongoose is required
 ** The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 ** you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 ** On subsequent calls, it will return the same instance that was created and returned to you the first
 ** time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// // '.on' is a node event listener
// // the event listener is added to the mongoose connection.prototype.readyState
// mongoose.connection.on('connected', () => {
//   console.log('Database connected');
// });
