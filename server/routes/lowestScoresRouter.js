const express = require('express')
const router = express.Router()
const lowestScoresController = require('../controllers/lowestScoresController')

router.get('/', lowestScoresController.getLowestScores)
router.get('/beach', lowestScoresController.getLowestScoresBeach)
router.get('/factory', lowestScoresController.getLowestScoresFactory)
router.get('/skislope', lowestScoresController.getLowestScoresSkislope)


module.exports = router