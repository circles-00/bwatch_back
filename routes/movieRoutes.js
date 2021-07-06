const express = require('express')
const movieController = require('../controllers/movieController')

const router = express.Router()

router.post('/search', movieController.searchMovies)

module.exports = router
