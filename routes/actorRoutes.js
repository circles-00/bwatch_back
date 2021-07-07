const express = require('express')
const actorController = require('../controllers/actorController')

const router = express.Router()

router.get('/:id', actorController.getActor)

module.exports = router
