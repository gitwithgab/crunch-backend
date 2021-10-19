const showsModel = require("../models/ShowsModel");
const {v4: uuid4} = require('uuid');
const AWS = require('aws-sdk');


/*
    This will return the following:

    /tvshows  - All TV Shows

    /tvshows?genre=Action   

    /tvshows?featured=yes    -All featured

    /tvshows?featured=no  All non featured

*/

exports.getTVShows = (req,res)=>{

    if(req.query.genre && req.query.featured)
    {
        showsModel.find()
        .where("category").equals("tvshows")
        .and([{genre : req.query.genre},{isFeatured: req.query.featured}])

        .then(shows=>{
            res.json({
                message : `List all of the tv shows by ${req.query.genre} and isFeatured`,
                data : shows,
                total : shows.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })

    }

    else if (req.query.featured)
    {
        const value = req.query.featured;

        showsModel.find()
        .where("category").equals("tvshows")
        .and([{isFeatured : value}])
        .then(shows=>{
            res.json({
                message : `List of all featured shows`,
                data : shows,
                total : shows.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })
    }

    else if (req.query.genre)
    {
        const value = req.query.genre;

        showsModel.find()
        .where("category").equals("tvshows")
        .and([{genre : value}])
        .then(shows=>{
            res.json({
                message : `List of all ${value} tv shows`,
                data : shows,
                total : shows.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })
    }

    else {
        showsModel.find()
        .where("category").equals("tvshows")
        .then(shows=>{

            res.status(200).json({
                message : `List of all shows`,
                data : shows,
                total : shows.length
            })
        })

        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })
        
        }

};


exports.getMovies = (req,res)=>{

    if(req.query.genre && req.query.featured)
    {
        showsModel.find()
        .where("category").equals("movie")
        .and([{genre : req.query.genre},{isFeatured: req.query.featured}])

        .then(shows=>{
            res.json({
                message : `List all of movies by ${req.query.genre} and isFeatured`,
                data : shows,
                total : shows.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })

        })

    }


    else if(req.query.genre)
    {


        showsModel.find()
        .where("category").equals("movie")
        .and([{genre : req.query.genre}])

        .then(shows=>{
            res.json({
                message : `List all of movies by ${req.query.genre}`,
                data : shows,
                total : shows.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })

        })

    }
    else if (req.query.featured)
    {
        const value = req.query.featured;


        showsModel.find()
        .where("category").equals("movie")
        .and([{isFeatured : value}])
        .then(shows=>{
            res.json({
                message : `List of all featured movies`,
                data : shows,
                total : shows.length
            })
        })
        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })
    }

    else {
        showsModel.find()
        .where("category").equals("movie")
        .then(shows=>{

            res.status(200).json({
                message : `List of all movies`,
                data : shows,
                total : shows.length
            })
        })

        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })
        
        }

};


exports.getAShow = (req,res)=>{
   
    showsModel.findById({title:req.params.title})
    .then(show=>{
       
        if(show)
        {
            res.status(200).json({
                message : `${req.params.title} found`,
                data : show
            })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.title} not found`
            })
        }

    })

    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}` 
        })
    })

};


exports.addAShow = (req,res)=>{

    const s3 = new AWS.S3({
                accessKeyId: process.env.AWSAccessKeyId,
                secretAccessKey: process.env.AVSSecretKey
    });

    const showData = req.body;

    req.body.bannerImg = req.files.bannerImg.name;

    const fileType = req.files.bannerImg.mimetype;

    if(fileType.includes("image"))
    {

        const id = uuid4();

        const imageName = `${id}_${req.files.bannerImg.name}` ;

        const path = `${process.cwd()}/assets/img/uploads/${imageName}`

        req.files.bannerImg.mv(path)
        .then(()=>{

            const show = new showsModel(showData);

            show.save()
            .then(newShow=>{

                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: `${id}_${req.files.bannerImg.name}`,
                    Body: req.files.bannerImg.data
                };

                s3.upload(params,function(err,data) {
                    if(err){
                        throw err;
                    }
                    newShow.bannerImg = data.Location
                    newShow.save()
    
                    .then(newShow=>{
                        res.status(200).json({
                            message : `The show was created successfully`,
                            data : newShow
                        })
                    })

                })
  
            })

            .catch(err=>{

                res.status(500).json({
                    message : `Error ${err}`,
                })

            })
        
        })

            .catch(err=>{
                res.status(500).json({
                message : `Error :${err}`,
            })

    })
}

    else
    {
        res.status(400).json({
        message : `Sorry, you can only upload jpeg, gif and png image formats. Please try again.`,
       })
    }

};
        

exports.updateAShow = (req,res) =>{

    const updatedShow =req.body;

    //validation 

    showsModel.findByIdAndUpdate(req.params.id, updatedShow, {new:true})
    .then(show=>{
    
        if(show)
        {
            res.status(200).json({
                message : `${req.params.id} was successfully updated`,
                data : show
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


exports.deleteAShow = (req,res)=>{
    
    showsModel.findByIdAndRemove(req.params.id)
    .then(show=>{
        if(show)
        {
            res.status(200).json({
                message : `Movie Item with ID :${req.params.id} was successfully deleted`
                })
        }

        else
        {
            res.status(404).json({
                message : `${req.params.title} not found`
            })
        }

    })

    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })

};
