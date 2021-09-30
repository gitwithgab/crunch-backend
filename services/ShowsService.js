const {v4: uuid4} = require('uuid');
const showsModel = require("../models/ShowsModel");



exports.getAllShows = (req,res)=>{

    if(req.query.cat)
    {
        showsModel.find({category : req.query.cat})
        .then(shows=>{
            res.json({
                message : `List all of the shows by ${req.query.cat}`,
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
        let search;
        const value = req.query.featured;

        if (value === 'featured')
        {
            search = true
        }

        else
        {
            search = false
        }

        showsModel.find({isFeatured : search})
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

    else {
        showsModel.find()
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


exports.getAShow = (req,res)=>{
   
    showsModel.findOne({title:req.params.title})
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


    const showData = req.body;

    req.body.bannerImg = req.files.bannerImg.name;

    const fileType = req.files.bannerImg.mimetype;

    if(fileType.includes("image"))
    {

        const id =uuid4();

        const imageName = `${id}_${req.files.bannerImg.name}` ;

        const path = `${process.cwd()}/assets/img/uploads/${imageName}`

        req.files.bannerImg.mv(path)
        .then(()=>{

            const newShow = new showsModel(showData);

            newShow.save()
            .then(show=>{

                res.status(200).json({
                    message : `The show was created successfully`,
                    data : show
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
    
    showsModel.findOneAndRemove({title:req.params.title})
    .then(show=>{
        if(show)
        {
            res.status(200).json({
                message : `${req.params.title} was successfully deleted`
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
