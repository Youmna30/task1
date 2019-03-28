const Problem = require('../models/Problem');
const mongoose = require('mongoose');

exports.get_all_problems = (req,res,next) => {
  Problem.find()
  .select("_id statement user_id")
  .populate('user_id','email name mobile')
  .exec()
  .then(docs => {
    res.status(200).json({
      problems:docs.map(doc =>{
        return{
          _id:doc._id,
          statement:doc.statement,
          user_id:doc.user_id

        }
      })
    });
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
}
exports.add_problem = (req,res,next) => {
  const problem = new Problem({
    _id:mongoose.Types.ObjectId(),
    statement:req.body.statement,
    user_id:req.userData.userId
  });
  problem.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message:"problem Added"
    });
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
}
exports.delete_problem = (req,res,next)=>{
  const id = req.params.problemId;
 Problem.remove({_id:id})
 .exec()
  .then(result => {
    res.status(200).json({
      message:"problem Deleted successfully"
    });
  })
  .catch( err => {
     console.log(err);
     res.status(500).json({
       error:err

     });
   });

}
exports.update_problem = (req,res,next) =>{
  const id = req.params.problemId;
  const updateOps ={};
  for(const ops of req.body)
  {
    updateOps[ops.proName] = ops.value;
  }
 Problem.update({_id:id},{$set:updateOps})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
        message:'problem updated'
  });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}
