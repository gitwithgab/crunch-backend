const express = require("express");
const mongoose = require('mongoose');


if(process.env.NODE_ENV!="production")
{
    require('dotenv').config({path:"config/Keys.env"});
}


const movieController  = require("./controllers/MoviesController");
const tvShowController  = require("./controllers/TvShowsController");
/*const userController  = require("./controllers/UsersController");
*/

const app = express();

/*
app.use(cors({
    origin :"" - front end link
}))
*/

app.use(express.json());

app.use("/movie",movieController);

app.use("/tvshow",tvShowController);

/*app.use("/user",userController);*/


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