const mongoose = require('mongoose');
const { Schema } = mongoose;

const moviesSchema = new Schema({


    movie_title:    
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
    }

    
});


const moviesModel = mongoose.model('movies', moviesSchema);

module.exports = moviesModel; 