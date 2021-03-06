const express = require('express');
const router = express.Router();


const showsService = require("../services/showsService")


//view list of items
router.get('/', showsService.getMovies)

//view single item
router.get('/:id', showsService.getAShow)

//add a new item
router.post('/', showsService.addAShow)

//updates an item
router.put('/:id', showsService.updateAShow)

//deletes an item
router.delete('/:id', showsService.deleteAShow)


module.exports = router