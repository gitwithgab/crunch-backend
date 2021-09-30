const express = require('express');
const router = express.Router();


const userService = require("../services/UsersService")


//add a new item
router.post('/user', userService.createAuser)


module.exports = router