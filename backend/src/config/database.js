/**
 * First time mongoose is required
 * The require(‘mongoose’) call above returns a Singleton object. It means that the first time
 * you call require(‘mongoose’), it is creating an instance of the Mongoose class and returning it.
 * On subsequent calls, it will return the same instance that was created and returned to you the first
 * time because of how module import/export works in ES6.
 */
const mongoose = require('mongoose');

/*
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */

/**
 * The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change,
 * they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.
 * You should set useNewUrlParser: true unless that prevents you from connecting.
 *
 * useUnifiedTopology
 * False by default. Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true,
 * except for the unlikely case that it prevents you from maintaining a stable connection.
 */

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * // '.on' is a node event listener
 * // the event listener is added to the mongoose connection.prototype.readyState
 * // Currently disabled, could use to wipe the database clean and add in sample data
 * mongoose.connection.on('connected', () => {
 *  console.log('Database connected');
 * });
 */
