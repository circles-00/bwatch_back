const express = require('express')
const actorController = require('../controllers/actorController')

const router = express.Router()

router.get('/:id', actorController.getActor)
router.get('/popular', actorController.getPopularActors)

module.exports = router