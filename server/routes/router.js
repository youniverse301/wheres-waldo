const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    const userData = ["test1", "test2"]
    res.send(userData)
})

module.exports = router