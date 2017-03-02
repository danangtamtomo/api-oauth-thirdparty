var User = require('../models/user')

var Users = {}

Users.getUsers = function (req, res, next) {
  User.find({})
    .then(function (users) {
      res.send(users)
    })
}

Users.createUser = function (req, res, next) {
  var user = new User(req.body)
  user.save()
    .then(function (user) {
      res.send({
        status: 'Ok',
        message: 'New user has been created',
        book: book
      })
    }).catch(function (err) {
    res.send({
      status: 'Error',
      message: err
    })
  })
}

Users.updateBook = function (req, res, next) {
  User.update({
    _id: req.params.id
  }, {
    $set: req.body
  })
    .then(function (err, user) {
      res.send({
        status: 'Ok',
        message: `${req.body.name} has been updated`,
        updated_user: user
      })
    })
}

Users.deleteBook = function (req, res, next) {
  User.remove({
    _id: req.params.id
  })
    .then(function () {
      res.send({
        status: 'Ok',
        message: `The user has been deleted`
      })
    })
    .catch(function (err) {
      if (err) {
        res.send({
          status: 'Error',
          message: err
        })
      }
    })
}

module.exports = Books
