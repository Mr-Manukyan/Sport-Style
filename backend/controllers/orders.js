const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')



module.exports.createOrder = async (req, res) => {

  try {
    const lastOrder = await Order
                            .findOne({user : req.user.id})
                            .sort({date: -1})

    const maxOrder = lastOrder ? lastOrder.orderNumber : 0
    const orders = await new Order({
      user: req.user.id,
      orders: req.body.newOrders,
      money : req.body.totalPrice,
      orderNumber : maxOrder + 1,
    })
    orders.save()

    res.status(201).json({
      message: 'Your order has been accepted',
      resultCode : 201
    })

  } catch (error) {
    errorHandler(res, error)
  }
}


module.exports.getAllOrders = async (req, res) => {

  const query = {
    user: req.user.id
  }
  
  if(req.query.start){
     query.date = {
       $gte : req.query.start
     }
  }
  if(req.query.end){
    if(!query.date){
      query.date = {}
    }
    query.date['$lte'] = req.query.end
  }
  if(req.query.orderNumber){
     query.orderNumber = +req.query.orderNumber
  }
  try {
   const {page = 1, limit = 5} = req.query
   const allOrders = await Order.find(query)

   const ordersTotalPrice = allOrders.reduce((acc, order) => {
    return acc + order.money
  }, 0)

   const orders = await Order
                        .find(query)
                        .sort({date : -1})
                        .limit(limit * 1)
                        .skip( (page - 1) * limit)
                      

    res.status(200).json({
                          orders, 
                          totalHistoryOrderCount : allOrders.length,
                          ordersTotalPrice,
                          resultCode : 200
                        })
        
  }catch(error){
     errorHandler(res,error)
  }
}


module.exports.getOrdersByPrice = async (req, res) => {
 
    try {

     const {page = 1, limit = 5} = req.query
     const allOrders = await Order.find({ 
                                            user: req.user.id,
                                            money:{
                                                   $gte : +req.query.min,
                                                   $lte : +req.query.max,
                                                 } 
                                        })
  
                            
     const orders = await Order
                          .find({
                             user: req.user.id,
                             money: {
                                    $gte : +req.query.min,
                                    $lte : +req.query.max,
                                   }
                               })
                          .sort({money :-1})
                          .limit(limit * 1)
                          .skip( (page - 1) * limit)

    const ordersTotalPrice = allOrders.reduce((acc, order) => {
          return acc + order.money
    }, 0)                       
  
        if(orders.length){
          res.status(200).json({
            orders,
            totalHistoryOrderCount : allOrders.length,
            ordersTotalPrice,
            resultCode : 200
          })
        }else {
          res.status(404).json({message : 'There are no orders with such data'})
        }
  
    }catch(error){
       errorHandler(res,error)
    }
  }


module.exports.getOrdersByDate = async (req, res) => {
  console.log(req.query)
  let startDate = req.query.ordersDate
  let x = req.query.ordersDate.slice(8,10)
  let num = +x + 1
  if(num < 10){
    num = '0' + num
  }else{
     num = '' + num
  }
  let endDate = req.query.ordersDate.slice(0,8)
      endDate = endDate + num


  try {
   const {page = 1, limit = 5} = req.query
   const allOrders = await Order.find({ user: req.user.id,
                                        date:{
                                               $gte : new Date(startDate),
                                               $lt : new Date(endDate)
                                             } 
                                      })
   const orders = await Order
                        .find({
                           user: req.user.id,
                           date:{
                                  $gte : new Date(startDate),
                                  $lt : new Date(endDate)
                                } 
                             })
                        .sort({date :- 1})
                        .limit(limit * 1)
                        .skip( (page - 1) * limit)
  const ordersTotalPrice = allOrders.reduce((acc, order) => {
           return acc + order.money
  }, 0)  
      if(orders.length){
        res.status(200).json({
                              orders,
                              totalHistoryOrderCount : allOrders.length,
                              ordersTotalPrice,
                              resultCode : 200
                            })
      }else {
        res.status(404).json({message : 'There are no orders for this date'})
      }

  }catch(error){
     errorHandler(res,error)
  }
}



module.exports.deleteOrders = async (req, res) => {

  try {
    
     await Order.find({
      user: req.user.id,
    }).deleteMany()

    res.status(200).json({
      message : 'No order history',
      resultCode : 200
    })

  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.deleteOneOrder = async (req, res) => {

  try {
    
    await Order.find(
      { _id : req.params.id,
         user: req.user.id,
      }).deleteOne()


    res.status(200).json({
      message : 'order deleted',
      resultCode : 200
    })

  } catch (error) {
    errorHandler(res, error)
  }
}
