const express = require('express')
const actorController = require('../controllers/actorController')

const router = express.Router()

router.route('/:id').get(actorController.getActor)
router.route('/popular').get(actorController.getPopularActors)

module.exports = router
