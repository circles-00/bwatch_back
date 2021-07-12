/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      avatar: req.body.avatar,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    })

    const token = signToken(newUser._id)
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      },
    })
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      token: 'User with such email already exists',
    })
  }
}

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(401).json({
      status: 'failure',
      token: 'Incorrect email or password',
    })
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      status: 'failure',
      token: 'Incorrect email or password',
    })
  }

  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    token,
  })
})
