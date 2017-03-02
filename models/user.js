var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: {
    type: String,
    unique: true
  },
  name: String,
  age: Number,
  phone: String,
  salt: String,
  role: String
}, {
  timestamps: true
})

userSchema.methods.validPassword = function (password) {
  if (this.password !== password) {
    return false
  }

  return true
}

var user = mongoose.model('User', userSchema)

module.exports = user
