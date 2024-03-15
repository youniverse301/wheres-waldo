const express = require('express')
const router = express.Router()
const lowestScoresController = require('../controllers/lowestScoresController')

router.get('/', lowestScoresController.getLowestScores)

module.exports = router