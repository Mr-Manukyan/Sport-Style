const express = require('express')
const app = express()
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const orderRoutes = require('./routes/orders')
const productRoutes = require('./routes/products')
require('dotenv').config()
const path = require('path')



 mongoose.connect(process.env.mongoURI, {
                                          useNewUrlParser: true, 
                                          useUnifiedTopology: true 
                                        })
   .then(() => console.log('MongoDB successfully connected.'))
   .catch( (error) => console.log(`You have a problem ))) : ${error.code}`))


app.use(passport.initialize())
require('./meddleware/passport')(passport)  
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)


module.exports = app



