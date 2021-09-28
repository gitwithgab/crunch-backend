const express = require('express')
const router = express.Router()


const showsService = require("../services/ShowsService")


//view list of items
router.get('/', showsService.getAllShows)

//view single item
router.get('/:title', showsService.getAShow)

//add a new item
router.post('/', showsService.createAShow)

//updates an item
router.put('/:id', showsService.updateAShow)

//deletes an item
router.delete('/:title', showsService.deleteAShow)


module.exports = router