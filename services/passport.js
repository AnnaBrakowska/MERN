const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

//determines which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize takes id from the cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//instace of GoogleStrategy this strategy will be used for all callbacks
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    //callback logs accessToken after code is exchanged for profile
    (accessToken, refreshToken, profile, done) => {
      //before creating a new user make sure that this user does not exist in database already
      //findOne returns a promise so check what was returned
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we have that record
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
