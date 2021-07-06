const express = require('express')
const movieController = require('../controllers/movieController')

const router = express.Router()

router.post('/search', movieController.searchMovies)
router.get('/popular', movieController.getPopularMovies)
router.get('/upcoming', movieController.getUpcomingMovies)

module.exports = router
