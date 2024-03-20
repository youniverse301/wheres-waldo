const express = require('express')
const router = express.Router()
const dataController = require('../controllers/dataController')

router.post('/', dataController.createData)

router.get('/beach', dataController.getDataBeach)
router.get('/factory', dataController.getDataFactory)
router.get('/skislope', dataController.getDataSkislope)



module.exports = router