const mongoose = require('mongoose');
const { Schema } = mongoose;

const tvShowsSchema = new Schema({


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
    trailer:    
    {
        type:String,
        required:true
    },
    rating:    
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
    }

    
});


const tvShowsModel = mongoose.model('tvshows', tvShowsSchema);

module.exports = tvShowsModel; 