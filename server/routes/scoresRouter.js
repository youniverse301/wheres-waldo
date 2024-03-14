const express = require('express')
const router = express.Router()
const scoresController = require('../controllers/scoresController')

router.post('/', scoresController.createScore)

router.get('/', scoresController.getScores)

module.exports = router