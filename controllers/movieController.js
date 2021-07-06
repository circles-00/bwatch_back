const Movie = require('../models/movieModel')
const CatchAsync = require('../utils/catchAsync')

exports.searchMovies = CatchAsync(async (req, res, next) => {
  const data = await Movie.searchMovie(req.body.movieName)

  res.status(200).json({
    status: 'success',
    data,
  })
})
