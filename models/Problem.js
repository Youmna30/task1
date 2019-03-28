const mongoose = require('mongoose');
const problemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statement:{type: String,required:true},
    user_id:{type: mongoose.Schema.Types.ObjectId, ref:'User',required:true}
});
module.exports = mongoose.model('Problem',problemSchema);
