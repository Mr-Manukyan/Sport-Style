const Products = require('../models/Products')
const errorHandler = require('../utils/errorHandler')

module.exports.getAllProducts = async (req, res) => {

    try{
     const {page = 1, limit = 20} = req.query
     const allProducts = await Products.find()
     const products = await Products.find()
           .limit(limit * 1)
           .skip( (page - 1) * limit)

     res.status(200).json({
                            products,
                            totalCount : allProducts.length,
                            resultCode : 200
                           })
    }catch(e) {
      errorHandler(res,e)
    }
 }








 
