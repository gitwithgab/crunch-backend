const express = require('express');
const router = express.Router();


const usersService = require("../services/UsersService")


//add a new item
router.post('/', usersService.createAUser)

//view list of items
router.get('/', usersService.getAllUsers)

//view single item
router.get('/:id', usersService.getAUser)

//updates an item
router.put('/:id', usersService.updateAUser)

//deletes an item
router.delete('/:id', usersService.deleteAUser)


module.exports = router