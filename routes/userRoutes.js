const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/sign-up').post(authController.signup)
router.route('/login').post(authController.login)
router
  .route('/favorites')
  .get(authController.protect, authController.getFavorites)

router
  .route('/favorites/add/:id')
  .get(authController.protect, authController.addFavoriteMovies)
router
  .route('/favorites/remove/:id')
  .get(authController.protect, authController.removeFavoriteMovies)

module.exports = router
