const moviesModel = require("../models/MoviesModel");


exports.getAllMovies = (req,res)=>{

    moviesModel.find()
    .then(movie=>{
        res.status(200).json({
            message : `List of all movies`,
            data : movie
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};


exports.getAMovie = (req,res)=>{
   
    moviesModel.findOne({movie_title:req.params.movie_title})
    .then(movie=>{
       
        if(movie)
        {
            res.status(200).json({
                message : `${req.params.movie_title} found`,
                data : movie
            })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.movie_title} not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}` 
        })
    })
};


exports.createAMovie = (req,res)=>{

    const newMovie = req.body;

    const movie = new moviesModel(newMovie);

    movie.save()
    .then(movie=>{
        res.status(200).json({
            message : `The movie was created successfully`,
            data : movie
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};

exports.updateAMovie = (req,res) =>{

    const updatedMovie =req.body;
    moviesModel.findByIdAndUpdate(req.params.id, updatedMovie, {new:true})
    .then(movie=>{
        if(movie)
        {
            res.status(200).json({
                message : `${req.params.id} was successfully updated`,
                data : movie
                })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.id} not found`
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};


exports.deleteAMovie = (req,res)=>{
    
    moviesModel.findOneAndRemove({movie_title:req.params.movie_title})
    .then(movie=>{
        if(movie)
        {
            res.status(200).json({
                message : `${req.params.movie_title} was successfully deleted`
                })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.movie_title} not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};
