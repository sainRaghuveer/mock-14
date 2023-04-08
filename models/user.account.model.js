const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    name:String,
    gender:String,
    DOB:String,
    email:String,
    mobile:String,
    initialBalance:Number,
    adharNo:String,
    panNo:String   
});

const userModel=mongoose.model('User', userSchema);

module.exports={
    userModel
}