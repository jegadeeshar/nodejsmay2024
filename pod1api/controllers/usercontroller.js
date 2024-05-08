const user=require('../models/user');
const Role=require('../models/role');
const Branch=require('../models/branch');
const {validationResult}=require('express-validator')
const config=require('config')
const mongoose=require('mongoose')
const { startSession } = require('mongoose')
//fetch all users
exports.fetchAllUsers=(req,res)=>{
    user.find().countDocuments().then(count=>{
        console.log(count);
        let pages=req.query.pages;
        let limit=req.query.limit;
        console.log(pages);
        user.find()
            .skip(pages)
            .limit(limit)
            .then(data=>{
            //console.log(typeof (data[0].mobileNo))

            res.status(config.get('statusCode.success')).send({
                message:'users information ready to consume',
                totalPages:count,
                skipPages:pages,
                limit:limit,
                users:JSON.parse(JSON.stringify(data,
                    (_, v) => typeof v === 'bigint' ? v.toString() : v))})
        }).catch(error=>{
            res.status(config.get('statusCode.logicError')).send({
                message:'users information not found',
                errorMessage: error.message
            })

        })

    }).catch(err=>{
        console.log(err);

    })


}
//fetch by Id
exports.fetchUserById=async (req,res)=>{

}

//save the user
exports.saveUser=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.
        status(config.get('statusCode.badRequest')).json({
            errors:errors.array()
        })
    }
  
  
  
    const role = await Role.findOne({ roleName: req.body.roles });
          
    if (!role) {
        // If the role does not exist, return an error response
        return res.status(400).json({ message: `Role '${roleName}' not found.` });
    }
  
  
    const branch = await Branch.findOne({ branchName: req.body.branch });
          
    if (!branch) {
        // If the branch does not exist, return an error response
        return res.status(400).json({ message: `Branch '${branchName}' not found.` });
    }
  
    const userInstance=new user({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        dob:req.body.dob,
        gender:req.body.gender,
        mobileNo:req.body.mobileNo,
        roles:[role._id],
        branch: [branch._id],
        email: req.body.email,
        password: req.body.password,
        customerId: req.body.customerId,
        which_is_your_born_city: req.body.which_is_your_born_city,
        What_is_your_pet_name: req.body.What_is_your_pet_name
    })
      //promise resolved --> then
      //promise rejected --> catch
      await userInstance.save().then(result=>{
          return res.
          status(config.get('statusCode.created')).json({
              message:`user instance successfully created ${result}`
          })
  
      }).catch(err=>{
          return res.
          status(config.get('statusCode.logicError')).json({
              error: `User Could Not be Saves ${err}`
          })
      })

    }


//delete User

exports.deleteUser=async (req,res)=>{

}


//update Multiple Roles to user based on mob number
exports.updateUserRole=async (req,res)=>{
    const filter = {mobileNo:req.params.mobileNo};
 
    const roles = await Role.find({ roleName: { $in: req.body.roles } });
   const roleIds = [];
   for (let i = 0; i < roles.length; i++) {
    roleIds.push(roles[i].id);
    console.log('RoleIds ',roleIds);
}
 
    if(roleIds.length == 0)
        {
            logger.info(`Unknown Role Request ${req.body.roles}`);
            console.log(`Unknown Role Request ${req.body.roles}`);
             return res.status(400).json({message: `Roles not found`});
        }
 
 
    //create session
    const session = await conn.startSession();
    const update = {mobileNo:req.body.mobileNo,roles:roleIds};
    session.startTransaction()
    try
    {
    await user.findOneAndUpdate(filter,update,{new:true}).then(result =>
        {
            session.commitTransaction();
            res.status(config.get('statusCode.success')).send({
                message: `user details updated for the mobileNo ${req.params.mobileNo}`,
                user: JSON.parse(JSON.stringify(result,
                    (_, v) => typeof v === 'bigint' ? v.toString() : v))
            })
        }).catch(error =>
        {
            session.abortTransaction();
            res.status(config.get('statusCode.logicError')).send({
                message: `user details not updated for the mobileNo ${req.params.mobileNo}`,
                error: error.message
            })
        })
}finally
{
    await session.endSession()
}
 
 
 
}