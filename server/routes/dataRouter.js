const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

router.post('/', dataController.createData)

router.get('/', dataController.getData)


module.exports = router