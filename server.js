const express = require("express");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');


if(process.env.NODE_ENV!="production")
{
    require('dotenv').config({path:"config/Keys.env"});
}


const movieController  = require("./controllers/MoviesController");
const tvShowController  = require("./controllers/TvShowsController");
const userController  = require("./controllers/UsersController");


//middleware that will allow API to parse incoming JSON data
const app = express();

//middleware that will allow API to parse multipart/form-data (Data that contains both text and files)
app.use(fileUpload());
/*

app.use(express.static('assets/img/uploads'))
*/

app.use(cors({
    origin : process.env.FRONT_END_ADDRESS
}))

app.use(express.json());

app.use("/movies",movieController);

app.use("/tvshows",tvShowController);

app.use("/users",userController);


const PORT = process.env.PORT;
app.listen(PORT,()=>{
   
    console.log(`Web Server is up and running on port ${PORT}`)

    mongoose.connect(`${process.env.MONGO_DB_CONNECT}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`Connected successfully to MongoDB`)
    })

    .catch(err=>{
        console.log(`Error occured ${err}`)
    })

})