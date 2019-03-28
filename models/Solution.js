const mongoose = require('mongoose');
const solutionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statement:{type: String,required:true},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    problem_id:{type: mongoose.Schema.Types.ObjectId, ref:'Problem',required:true}


});
module.exports = mongoose.model('Solution',solutionSchema);
