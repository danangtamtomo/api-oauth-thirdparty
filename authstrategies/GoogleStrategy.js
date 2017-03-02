var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var User = require('../models/user')
require('dotenv').config()

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function (accessToket, refreshToken, profile, done) {
    User.findOne({
      name: profile.displayName
    })
      .then(function (user) {
        if (!user) {
          var user = new User({
            name: profile.displayName
          })
          user.save()
            .then(function (user) {
              done(null, profile)
            })
            .catch(function (err) {
              done(null, {
                status: 'Error',
                message: err
              })
            })
        }
      })
      .catch(function (err) {
        console.log(err)
      })
  }
))

module.exports = passport
