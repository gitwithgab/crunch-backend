const tvShowModel = require("../models/TvShowsModel");


exports.getAllTvShows = (req,res)=>{

    tvShowModel.find()
    .then(tvshow=>{
        res.status(200).json({
            message : `List of all TV Shows`,
            data : tvshow
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};


exports.getATvShow = (req,res)=>{
   
    tvShowModel.findOne({tvshow_title:req.params.tvshow_title})
    .then(tvshow=>{
       
        if(tvshow)
        {
            res.status(200).json({
                message : `${req.params.tvshow_title} found`,
                data : tvshow
            })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.tvshow_title} not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}` 
        })
    })
};


exports.createATvShow = (req,res)=>{

    const newTvShow = req.body;

    const tvshow = new tvShowModel(newTvShow);

    tvshow.save()
    .then(tvshow=>{
        res.status(200).json({
            message : `The TV Show was created successfully`,
            data : tvshow
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};

exports.updateATvShow = (req,res) =>{

    const updatedTvShow =req.body;
    tvShowModel.findByIdAndUpdate(req.params.id, updatedTvShow, {new:true})
    .then(tvshow=>{
        if(tvshow)
        {
            res.status(200).json({
                message : `${req.params.id} was successfully updated`,
                data : tvshow
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


exports.deleteATvShow = (req,res)=>{
    
    tvShowModel.findOneAndRemove({tvshow_title:req.params.tvshow_title})
    .then(tvshow=>{
        if(tvshow)
        {
            res.status(200).json({
                message : `${req.params.tvshow_title} was successfully deleted`
                })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.tvshow_title} not found`
            })
        }

    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};
