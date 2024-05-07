const mongoose= require('mongoose')
const string_decoder = require("string_decoder");
const Schema= mongoose.Schema;
const roleSchema=new
Schema({
   roleId:{
      type:Number,
      required:true},
   roleName:{type:String,required:true},

})

module.exports = mongoose.model("Role",roleSchema)