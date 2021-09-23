const express = require('express')
const router = express.Router()


const tvShowService = require("../services/TvShowsService")


//view list of items
router.get('/', tvShowService.getAllTvShows)

//view single item
router.get('/:tvshow_title', tvShowService.getATvShow)

//add a new item
router.post('/', tvShowService.createATvShow)

//updates an item
router.put('/:id', tvShowService.updateATvShow)

//deletes an item
router.delete('/:tvshow_title', tvShowService.deleteATvShow)


module.exports = router