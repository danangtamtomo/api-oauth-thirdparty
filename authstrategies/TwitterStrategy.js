var passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy
User = require('../models/user')

require('dotenv').config()

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/callback'
},
  function (token, tokenSecret, profile, done) {
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
              return done(null, profile)
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
