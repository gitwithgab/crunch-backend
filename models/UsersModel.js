const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({


    firstName:    
    {
        type:String,
        required:true
    },
    lastName:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    username:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    profileImg:
    {
        type:String,
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
    
});


const userModel = mongoose.model('user', userSchema);

module.exports = userModel; 