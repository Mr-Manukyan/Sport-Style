const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/orders')

router.get('/history',passport.authenticate('jwt',{session : false}),controller.getAllOrders) 
router.post('/',passport.authenticate('jwt',{session : false}),controller.createOrder) 
router.delete('/history',passport.authenticate('jwt',{session : false}),controller.deleteOrders) 
router.delete('/history/:id',passport.authenticate('jwt',{session : false}),controller.deleteOneOrder) 
router.get('/history/searchOrders/date',passport.authenticate('jwt',{session : false}),controller.getOrdersByDate) 
router.get('/history/searchOrders/price',passport.authenticate('jwt',{session : false}),controller.getOrdersByPrice) 
   

module.exports = router