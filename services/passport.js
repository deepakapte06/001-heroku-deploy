// [2] including passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

//get access to the mongoose model
const mongoose = require("mongoose");

const User = mongoose.model("users");

//to identify the user uniquely, we are not making use of the google profileId, but the unquie id created by the mongoose.
//the below user.id is the mongoose id.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log("access token:", accessToken);
      //console.log("refresh token:", refreshToken);
      //console.log("Profile: ", profile);
      //google id is captured here in the profile:id response.

      //queries into mongoose DB.

      //find if the user exist in the DB using Promise.
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //we have a record with existing id.
          done(null, existingUser);
        } else {
          //user does not yet exist . creat and save a new user.
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
