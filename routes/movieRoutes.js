const express = require('express')
const movieController = require('../controllers/movieController')

const router = express.Router()

router.get('/:id', movieController.getMovie)
router.get('/recommended/:id', movieController.getRecommended)
router.get('/top', movieController.getTopMovies)
router.post('/search', movieController.searchMovies)
router.get('/popular', movieController.getPopularMovies)
router.get('/upcoming', movieController.getUpcomingMovies)

module.exports = router
