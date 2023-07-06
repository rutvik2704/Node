const mongoose = require("mongoose")

const cartschema = new mongoose.Schema({
   uid:{
    type : mongoose.Schema.Types.ObjectId
   },
   pid: {
    type: mongoose.Schema.Types.ObjectId
   },
   price:{
    type:Number
   },
   qty:{
    type:Number
   },
   total:{
    type:Number
   }
})

module.exports= new mongoose.model("Cart",cartschema)
