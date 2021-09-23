const userModel = require("../models/UsersModel");


exports.createAUser = (req,res)=> {

    const newUser = req.body;

    const user = new userModel(newUser);

    user.save()
    .then(user=>{
        res.status(200).json({
            message : `Account was successfully created`,
            data : user
        })
    })
    .catch(err=>{
        res.status(500).json({
            message : `Error ${err}`
        })
    })
};


