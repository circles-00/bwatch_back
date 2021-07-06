const Movie = require('../models/movieModel')
const CatchAsync = require('../utils/catchAsync')

exports.getMovie = CatchAsync(async (req, res, next) => {
  const data = await Movie.singleMovie(req.params.id)

  res.status(200).json({
    status: 'success',
    data,
  })
})

exports.searchMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.searchMovie(req.body.movieName)

  res.status(200).json({
    status: 'success',
    data,
  })
})

exports.getPopularMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.popularMovies()

  res.status(200).json({
    status: 'success',
    data,
  })
})

exports.getUpcomingMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.upcomingMovies()

  res.status(200).json({
    status: 'success',
    data,
  })
})
