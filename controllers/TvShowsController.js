const express = require('express')
const router = express.Router()


const tvShowsService = require("../services/TvShowsService")


//view list of items
router.get('/', tvShowsService.getAllTvShows)

//view single item
router.get("/:tvshow_name", tvShowsService.getATvShow)

//add a new item
router.post('/', tvShowsService.createATvShow)

//updates an item
router.put('/:id', tvShowsService.updateATvShow)

//deletes an item
router.delete('/:tvshow_name', tvShowsService.deleteATvShow)


module.exports = router