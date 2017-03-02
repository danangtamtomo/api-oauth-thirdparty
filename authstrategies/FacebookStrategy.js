var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../models/user')
require('dotenv').config()

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile)
      // console.log(profile)
      // User.findOne({
      //   name: profile.displayName
      // })
      //   .then(function (user) {
      //     if (!user) {
      //       var user = new User({
      //         name: profile.displayName
      //       })
      //       user.save()
      //         .then(function (user) {
      //           return done(null, profile)
      //         })
      //         .catch(function (err) {
      //           done(null, {
      //             status: 'Error',
      //             message: err
      //           })
      //         })
      //     }
      //   })
      .catch(function (err) {
        console.log(err)
      })
  }
))

module.exports = passport
