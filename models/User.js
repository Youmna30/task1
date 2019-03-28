const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
      type: String,required:true,unique:true,
      match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    name:{
      type:String,required:true,
      match:/^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$/
    },
    mobile:{
      type:String,required:true,
      match:/^01[0-2]{1}[0-9]{8}/
    },
    password:{type: String , required:true},

});
module.exports = mongoose.model('User',userSchema);
