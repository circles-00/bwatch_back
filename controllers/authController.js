/* eslint-disable arrow-body-style */
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const randomString = require('randomstring')
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

exports.protect = catchAsync(async (req, res, next) => {
  // Check if token is present in the header
  let token
  let decoded
  let freshUser

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // console.log(token)

  if (!token) {
    return res.status(404).json({
      status: "You're  not logged in! Please log in to gain access",
    })
  }

  // Check if token is valid
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // console.log(decoded)
  } catch (err) {
    return res.status(403).json({
      status: 'Invalid token',
    })
  }

  // Check if user still exists
  // eslint-disable-next-line prefer-const
  freshUser = await User.findById(decoded.id)
  if (!freshUser) {
    return next(
      res.status(404).json({
        status: 'User does not exist',
      })
    )
  }

  // Check if user has recently changed password
  if (freshUser.changedPasswordAfter(decoded.iat) === true) {
    return next(
      res.status(404).json({
        status: 'Password has been recently changed',
      })
    )
  }

  req.user = freshUser
  // Grant access
  next()
})

// Favorite List
exports.getFavorites = catchAsync(async (req, res, next) => {
  User.findOne({ _id: req.headers.id }, (err, obj) => {
    if (obj) {
      return res.status(200).json({
        status: 'success',
        data: obj.favMovies,
      })
    }
    return res.status(404).json({
      status: 'failed',
    })
  })
})

exports.addFavoriteMovies = catchAsync(async (req, res, next) => {
  // console.log(req.user)
  const userEmail = req.user.email
  const movieId = parseInt(req.params.id, 10)
  // const status = await req.user.addFavoriteMovie(req.params.id)
  const ids = Array.from(req.user.favMovies)
  console.log(ids[0])

  if (!ids.find((elem) => elem === movieId)) {
    await User.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $push: {
          favMovies: movieId,
        },
      }
    )

    const status = 'success'
    if (status === 'success') {
      return res.status(200).json({
        status: 'success',
      })
    }
  }

  return res.status(404).json({
    status: 'failed, movie already added as favorite',
  })
})

exports.removeFavoriteMovies = catchAsync(async (req, res, next) => {
  // console.log(req.user)
  const userEmail = req.user.email
  const movieId = parseInt(req.params.id, 10)
  // const status = await req.user.addFavoriteMovie(req.params.id)
  const ids = Array.from(req.user.favMovies)
  // console.log(ids[0])

  if (ids.find((elem) => elem === movieId)) {
    await User.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $pullAll: {
          favMovies: [movieId],
        },
      }
    )

    const status = 'success'
    if (status === 'success') {
      return res.status(200).json({
        status: 'success',
      })
    }
  }

  return res.status(404).json({
    status: 'failed, movie is not added as favorite',
  })
})

// Watch-List
exports.getWatchList = catchAsync(async (req, res, next) => {
  User.findOne({ _id: req.headers.id }, (err, obj) => {
    if (obj) {
      return res.status(200).json({
        status: 'success',
        data: obj.watchList,
      })
    }
    return res.status(404).json({
      status: 'failed',
    })
  })
})

exports.addToWatchList = catchAsync(async (req, res, next) => {
  const userEmail = req.user.email
  const movieId = parseInt(req.params.id, 10)
  const ids = Array.from(req.user.watchList)

  if (!ids.find((elem) => elem === movieId)) {
    await User.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $push: {
          watchList: movieId,
        },
      }
    )

    const status = 'success'
    if (status === 'success') {
      return res.status(200).json({
        status: 'success',
      })
    }
  }

  return res.status(404).json({
    status: 'failed, movie already added to watch-list',
  })
})

exports.removeFromWatchList = catchAsync(async (req, res, next) => {
  const userEmail = req.user.email
  const movieId = parseInt(req.params.id, 10)
  const ids = Array.from(req.user.watchList)

  if (ids.find((elem) => elem === movieId)) {
    await User.findOneAndUpdate(
      {
        email: userEmail,
      },
      {
        $pullAll: {
          watchList: [movieId],
        },
      }
    )

    const status = 'success'
    if (status === 'success') {
      return res.status(200).json({
        status: 'success',
      })
    }
  }

  return res.status(404).json({
    status: 'failed, movie is not added to watch-list',
  })
})

// Upload profile pictures

// 1) Generate random unique string for filename
// console.log(fileName)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const name = randomString.generate()
    const ext = file.originalname.split('.')[1]
    req.filename = `${name}.${ext}`
    cb(null, `${name}.${ext}`)
    return `${name}.${ext}`
  },
})

// Upload the image
const uploadImg = multer({ storage: storage }).single('image')
exports.uploadProfileImg = catchAsync(async (req, res) => {
  if (!fs.existsSync(path.join(__dirname, `../uploads/`))) {
    fs.mkdir(path.join(__dirname, `../uploads/`), (fserr) => {
      if (fserr) {
        console.log(fserr)
      }
      console.log('Successfully created folder')
    })
  }
  uploadImg(req, res, async (err) => {
    if (err) {
      return res.status(404).json({
        status: 'failed',
        error: err,
      })
    }
    if (req.user.avatar) {
      const oldImg = path.join(__dirname, `../uploads/${req.user.avatar}`)
      console.log(oldImg)
      if (fs.existsSync(oldImg)) {
        fs.unlink(oldImg, (error) => {
          console.log(error)
        })
      }
    }

    await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: { avatar: req.filename } }
    )
    return res.status(200).json({
      status: 'success',
      url: `https://${req.headers.host}/${req.filename}`,
    })
  })
})

exports.getProfileImg = catchAsync(async (req, res, next) => {
  User.findOne({ _id: req.headers.id }, (err, obj) => {
    if (obj) {
      return res.status(200).json({
        status: 'success',
        url: `https://${req.headers.host}/${obj.avatar}`,
      })
    }
    return res.status(404).json({
      status: 'failed',
    })
  })
})

exports.getUsers = catchAsync(async (req, res, next) => {
  User.find({ firstName: new RegExp(req.body.user, 'i') }, (err, docs) => {
    if (docs && req.body.user !== '') {
      return res.status(200).json({
        status: 'success',
        data: docs,
      })
    }
  })
})
