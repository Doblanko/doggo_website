import 'dotenv/config' // make this the top import so anything that uses the env variables is defined
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json()); // allow to extract data payload from POST request body
app.use(express.urlencoded({ extended: true })); // allow to extract data payload from post request from HTML form

// for authentication
app.use(session({ secret: process.env.session_secret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStrategy((username, password, done) => {
        username.findOne( { username: username}, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, { message: 'Incorrect username'});
            }

            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect Password'})
            }

            return done(null, user);
        });
    })
);
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.listen(3000, () => {
    console.log('Listening on port 3000!')
})