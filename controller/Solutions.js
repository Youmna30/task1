const Solution = require('../models/Solution');
const Problem = require('../models/Problem');

const mongoose = require('mongoose');

//Get All Solutions to a specific problem
exports.get_all_solutions=(req,res,next)=>{
const problemId = req.params.problemId;
Problem.findById(problemId)
.exec()
.then(problem => {
  if(! problem)
  {
    return res.status(404).json({
      message:"problem Not Found"
    });
  }
  return Solution.find({problem_id:problemId}).select('_id statement user_id')
  .exec()
})

.then(docs => {
  if(docs.length == 0)
  {
    res.status(200).json({
      message:"No Solutions For this problem"
  });
  }
  res.status(200).json({
    solutions:docs.map(doc => {
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
exports.add_solution=(req,res,next)=>{
Problem.findById(req.body.problem_id)
.exec()
.then(problem => {
  if(! problem)
  {
    return res.status(404).json({
      message:"problem Not Found"
    });
  }
  const solution = new Solution({
    _id: new mongoose.Types.ObjectId,
    statement: req.body.statement,
    problem_id: req.body.problem_id,
    user_id:req.userData.userId
  });
  return solution.save()
})
.then(result => {
  console.log(result);
  res.status(201).json({
    message:"Solution added successfully"
  });
})
.catch(err => {
     console.log(err);
     res.status(500).json({
       error:err

     });
   });
}
exports.delete_solution = (req,res,next)=>{
  const id = req.params.solutionId;
Solution.remove({_id:id})
  .exec()
  .then(result => {
    res.status(200).json({
      message:"solution deleted successfully"
    });
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
}
exports.update_solution = (req,res,next)=>{
  const id = req.params.solutionId;
  const updateOps ={};
  for(const ops of req.body)
  {
    updateOps[ops.proName] = ops.value;
  }
 Solution.update({_id:id},{$set:updateOps})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
        message:'solution updated'
  });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
}
