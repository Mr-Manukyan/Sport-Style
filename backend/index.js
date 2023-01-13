const app = require('./app')
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.listen(PORT, (err) =>{
 if(err){
   throw Error(err)
 }
 console.log(`Node server has been started on ${PORT}`)
} )