const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an e-mail address'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please enter a password longer than 8 characters'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (placeHolder) {
        return placeHolder === this.password
      },
    },
  },
  favMovies: {
    type: [Number],
    unique: true,
  },
  watchList: {
    type: [Number],
    unique: true,
  },
  passwordChangedAt: Date,
})

/* @@desc Encrypt password before storing it into the database
  For that we will need to write a pre-hook, which is basically
  a middleware that will be called before writing the user into the DB.
*/
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  this.passwordConfirm = undefined
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    )
    return JWTTimestamp < changedTimeStamp
  }

  return false
}

userSchema.methods.FavoriteMovies = async function () {
  return this.favMovies
}

userSchema.methods.WatchList = async function () {
  return this.watchList
}

const User = mongoose.model('User', userSchema)

module.exports = User
