const express = require('express')
const router = express.Router()
const controller = require('../controllers/products')

router.get('/',controller.getAllProducts) 


module.exports = router