const mongoose = require('mongoose');
const { Schema } = mongoose;

const showsSchema = new Schema({

    category:
    {
        type:String,
        required:true
    },
    title:    
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
    isFeatured:
    {
        type:Boolean,
        default:false
    },
    bannerImg:    
    {
        type:String,
        required:true
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }

    
});


const showsModel = mongoose.model('show', showsSchema);

module.exports = showsModel; 