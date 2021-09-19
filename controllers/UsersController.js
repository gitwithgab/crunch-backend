const express = require('express')
const router = express.Router()


const usersService = require("../services/UsersService")


//add a new item
router.post('/', usersService.createAuser)


module.exports = router