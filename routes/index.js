var express = require('express')
var router = express.Router()
var LocalStrategy = require('../authstrategies/LocalStrategy')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/login', function (req, res, next) {
  res.send({message: 'Gagal'})
})

router.post('/login', LocalStrategy.authenticate('local', {failureRedirect: '/login'}), function (req, res) {
  res.send({message: 'Yess'})
})

module.exports = router
