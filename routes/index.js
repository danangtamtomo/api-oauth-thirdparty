var express = require('express')
var router = express.Router()
var LocalStrategy = require('../authstrategies/LocalStrategy')
var FacebookStrategy = require('../authstrategies/FacebookStrategy')
var TwitterStrategy = require('../authstrategies/TwitterStrategy')
var GoogleStrategy = require('../authstrategies/GoogleStrategy')

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

/**
 * Facebook OAuth
 */
router.get('/auth/facebook', FacebookStrategy.authenticate('facebook'))

router.get('/auth/facebook/callback', FacebookStrategy.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'}), function (req, res) {
  res.send(res.req)
})

/**
 * Facebook OAuth
 */
router.get('/auth/twitter', TwitterStrategy.authenticate('twitter'))

router.get('/auth/twitter/callback',
  TwitterStrategy.authenticate('twitter', { successRedirect: '/',
  failureRedirect: '/login' }), function (req, res) {
    res.send(res.req)
  })

/**
 * Google OAuth
 */
router.get('/auth/google', GoogleStrategy.authenticate('google', { scope: ['profile'] }))

router.get('/auth/google/callback',
  GoogleStrategy.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.send(res.req)
  })

module.exports = router
