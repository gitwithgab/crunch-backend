const express = require("express");
const mongoose = require('mongoose');


require('dotenv').config({path:"config/Keys.env"});


const moviesController  = require("./controllers/MoviesController");
/*const tvShowsController  = require("./controllers/TvShowsController");
const usersController  = require("./controllers/UsersController");*/


const app = express();


app.use(express.json());

app.use("/movies",moviesController);
/*
app.use("/tvshows",tvShowsController);

app.use("/users",usersController);*/


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