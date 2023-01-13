const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  
  userName : {
    type : String,
    required : true,
  },

  email : {
      type : String,
      required : true,
      unique : true
  },
  passwordHash : {
      type : String,
      required : true
  },
  
  userPhoto : {
    type: String,
    default : ''
},

 
})

module.exports = mongoose.model('users', userSchema)