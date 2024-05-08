const mongoose= require('mongoose')
//const string_decoder = require("string_decoder");
const Schema= mongoose.Schema;
const brachSchema=new
Schema({
    branchCode:{
      type:Number,
      required:true},
    branchName:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    country:{type:String,required:true},
    phoneNumber :{type:BigInt,required:true}

})

module.exports = mongoose.model("Branch",brachSchema)