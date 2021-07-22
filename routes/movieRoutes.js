const express = require('express')
const movieController = require('../controllers/movieController')

const router = express.Router()

router.route('/top').get(movieController.getTop)
router.route('/:id').get(movieController.getMovie)
router.route('/recommended/:id').get(movieController.getRecommended)
router.route('/search').post(movieController.searchMovies)
router.route('/popular').get(movieController.getPopularMovies)
router.route('/upcoming').get(movieController.getUpcomingMovies)
router.route('/cast/:id').get(movieController.getMovieCast)

module.exports = router
