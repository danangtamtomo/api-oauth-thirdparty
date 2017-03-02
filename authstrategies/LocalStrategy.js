var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/user')

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      })
      .catch(function (err) {
        console.log(err)
      })
  }
))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

module.exports = passport
