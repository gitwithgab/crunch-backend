const userModel = require("../models/UsersModel");
const {v4: uuid4} = require('uuid');
const AWS = require('aws-sdk');

exports.createAUser = (req,res)=> {

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWSAccessKeyId,
        secretAccessKey: process.env.AVSSecretKey
    });

    const userData = req.body;

    req.body.profileImg = req.files.profileImg.name;

    const fileType = req.files.profileImg.mimetype;

    if(fileType.includes("image"))
    {
        const id = uuid4()

        const imageName = `${id}_${req.files.profileImg.name}`
    
        const path = `${process.cwd()}/assets/img/uploads/${imageName}`

        req.files.profileImg.mv(path)
        .then(()=>{

            const user = new userModel(userData);

            user.save()
            .then(newUser=>{

                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: `${id}_${req.files.profileImg.name}`,
                    Body: req.files.profileImg.data
                }

                s3.upload(params,function(err,data) {
                    if(err){
                        throw err;
                    }
                    newUser.profileImg = data.Location
                    newUser.save()

                    .then(newUser=>{
                        res.status(200).json({
                            message : `Account was successfully created`,
                            data : newUser
                        })
                    })

            })


        })

        .catch(err=>{
            res.status(500).json({
                message : `Error ${err}`
            })
        })
    })

        .catch(err=>{
            res.status(500).json({
            message : `Error:${err}`
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


exports.getAllUsers=(req,res)=>{
    userModel.find()
    .then((user)=>{
        res.json({
            message:'List of all users',
            data:user,
            length:user.length
        })
    })
    .catch(err=>{
        res.json({
            message:'Users could not be returned',
            data:err
        }) 
       })
}


exports.getAUser=(req,res)=>{
    
   
    userModel.findById(req.params.id)
    .then((user)=>{

        if(user){

            res.json({
                message:`User with id:${req.params.id} has been returned`,
                data:user
            })

        }
        else{

            res.status(404).json({
                message:`User with id:${req.params.id} was not returned`,
              
            })
        }
      
       
    })
    .catch(err=>{
        res.status(404).json({
         message:`User with id:${req.params.id} was not found`,
         error:err
        }) 
     })
}


exports.updateAUser=(req,res)=>{

    const update = req.body
    userModel.findByIdAndUpdate(req.params.id,update,{new:true})
    .then((user)=>{
        res.json({
            message:`${req.params.id } has been updated`,
            data:user
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:err
        }) 
    })
}


exports.deleteAUser =(req,res)=>{
    userModel.findByIdAndDelete({_id:req.params.id})
    .then((user)=>{
        res.json({
            message:`${req.params.id} was deleted`,
            data:user,
            length:user.length
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:`Movie ${req.params.id} could not be deleted`,
            error:err
           }) 
    })
}

