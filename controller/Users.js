const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
  //find return array
  User.find({email:req.body.email})
  .exec()
  .then( user => {
    if(user.length >=1 )
    {
      return res.status(409).json({
          message:'Email exists'
      });
    }
    else{
      bcrypt.hash(req.body.password,10,(err,hash)=> {
        if(err){
          return res.status(500).json({
            error:err
          });
        }
        else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            name: req.body.name,
            mobile:req.body.mobile,
            password: hash

          });
          user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message:"User Created"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error:err
            });
          });
        }
      });
    }
  })
}

exports.login = (req,res,next)=>{
  User.find({email:req.body.email})
  .exec()
  .then( user => {
    // not found this email
    if(user.length < 1){
       return res.status(401).json({
         message:'Auth failed'
       });
       console.log("hiii"+process.env.JWT_KEY);

    }
    bcrypt.compare(req.body.password,user[0].password,(err,result) => {
      if(err)
      {
        return res.status(401).json({
          message:'Auth Failed'
        });
      }
      if(result){
        const token = jwt.sign(
          {
            email:user[0].email,
            userId:user[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn:"1h"
          }
        );
        return res.status(200).json({
          message:'Auth successful',
          token: token
        });
      }
      res.status(401).json({
        message:'Auth Failed'
    });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}

exports.delete_user = (req,res,next) => {
  User.remove({_id: req.params.userId})
  .exec()
  .then( result => {
    res.status(200).json({
      message:"user deleted successfully"
    });
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
}
exports.get_all_users = (req,res,next) =>{
  //console.log(req.userData.email);
  User.find()
  .select("_id email name")
  .exec()
  .then(docs => {
    res.status(200).json({
      users:docs.map(doc => {
        return{
          _id:doc._id,
          email:doc.email,
          name:doc.name
        }
      })
    });
  })
  .catch(err =>{
    res.status(500).json({
      error:err
    });
  });
}
exports.update_user = (req,res,next)=>{
const id = req.params.userId;
const updateOps ={};
for(const ops of req.body)
{
  updateOps[ops.proName] = ops.value;
  if(ops.proName == '_id')
  {
    return res.status(401).json({
      message:"cannot update id"
    });
  }
  if(ops.proName == 'email')
  {
    User.find({email:ops.value})
    .exec()
    .then( user => {
      if(user.length >=1 )
      {
        return res.status(409).json({
            message:'Email already exists'
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
  }
}
User.update({_id:id},{$set:updateOps},{runValidators: true})
.exec()
.then(result => {
  console.log(result);
  res.status(200).json({
      message:'user updated'
});
})
.catch(err => {
  console.log(err);
  res.status(500).json({
    error:err
  });
});
}
