var express = require('express')
var router = express.Router()
var LocalStrategy = require('../authstrategies/LocalStrategy')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}))

module.exports = router
