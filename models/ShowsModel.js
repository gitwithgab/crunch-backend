const mongoose = require('mongoose');
const { Schema } = mongoose;

const showsSchema = new Schema({


    title:    
    {
        type:String,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    synopsis:
    {
        type:String,
        required:true
    },
    genre:
    {
        type:String,
        required:true
    },
    userScore:
    {
        type:Number,
        required:true
    },
    bannerImg:    
    {
        type:String,
        required:true
    },
    rentalPrice:
    {
        type:Number,
        required:true
    },
    purchasePrice:
    {
        type:Number,
        required:true
    },
    featured:
    {
        type:Boolean,
        default:false
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }

    
});


const showsModel = mongoose.model('show', showsSchema);

module.exports = showsModel; 