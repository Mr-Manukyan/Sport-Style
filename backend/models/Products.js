const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
  },

  price: {
    type: String,
  },
  firstType: {
    id: {
      type : String
    },
    quantity :{
     type : Number
    },
    size :{
      type : Number
    },
    src : {
      type : String
    },
  },

  secondType: {
    id: {
      type : String
    },
    quantity :{
     type : Number
    },
    size :{
      type : Number
    },
    src : {
      type : String
    },
  },
  thirdType: {
    id: {
      type : String
    },
    quantity :{
     type : Number
    },
    size :{
      type : Number
    },
    src : {
      type : String
    },
  },
});




module.exports = mongoose.model("products", productSchema);
