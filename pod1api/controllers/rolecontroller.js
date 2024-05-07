const {validationResult} = require("express-validator");
const config=require('config')
const role=require('../models/role')
//saving the role using post
exports.saveRole=async (req,res)=>{
  //validating json data
    const errors=validationResult(req);
    //in case of error return bad request
    if(!errors.isEmpty()){
        return res.status(config.get('statusCode.badRequest')).json({
            errors:errors.array()
        })
    }
     //role object created
    const roleInstance=new role({
        roleId: req.body.roleId,
        roleName: req.body.roleName
    })
    //role instance saved in mongodb
    await roleInstance.save().then(result=>{
        return res.status(config.get('statusCode.created')).json({
            message:`Role Successfully created ${result}`
        })
    }).catch(err=>{
        return res.status(config.get('statusCode.logicError')).json({
            error:`Role could not be created ${err}`
        })
    })

}