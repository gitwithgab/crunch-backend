const showsModel = require("../models/ShowsModel");


exports.getAllShows = (req,res)=>{

    showsModel.find()
    .then(show=>{
        res.status(200).json({
            message : `List of all shows`,
            data : show,
            total : show.length
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
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


exports.createAShow = (req,res)=>{

    const newShow = req.body;

    const show = new showsModel(newShow);

    show.save()
    .then(show=>{
        res.status(200).json({
            message : `The show was created successfully`,
            data : show
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};

exports.updateAShow = (req,res) =>{

    const updatedShow =req.body;
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
