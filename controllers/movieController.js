const Movie = require('../models/movieModel')
const CatchAsync = require('../utils/catchAsync')

exports.getMovie = CatchAsync(async (req, res, next) => {
  const data = await Movie.singleMovie(req.params.id)
  if (data) {
    res.status(200).json({
      status: 'success',
      data: data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.getRecommended = CatchAsync(async (req, res, next) => {
  const data = await Movie.recommendedMovies(req.params.id)

  if (data) {
    res.status(200).json({
      status: 'sucess',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.getTop = CatchAsync(async (req, res, next) => {
  const data = await Movie.topMovies()

  if (data) {
    res.status(200).json({
      status: 'sucess',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.searchMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.searchMovie(req.body.movieName)

  if (data) {
    res.status(200).json({
      status: 'success',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.getPopularMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.popularMovies()

  if (data) {
    res.status(200).json({
      status: 'success',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.getUpcomingMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.upcomingMovies()

  if (data) {
    res.status(200).json({
      status: 'success',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.getMovieCast = CatchAsync(async (req, res, next) => {
  const data = await Movie.movieCast(req.params.id)

  if (data) {
    res.status(200).json({
      status: 'success',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})

exports.getReviews = CatchAsync(async (req, res, next) => {
  const data = await Movie.movieReviews(req.params.id)

  if (data) {
    res.status(200).json({
      status: 'success',
      data,
    })
  } else
    res.status(404).json({
      status: 'failed',
    })
})
