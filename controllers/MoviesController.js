const express = require('express')
const router = express.Router()


const moviesService = require("../services/MoviesService")


//view list of items
router.get('/', moviesService.getAllMovies)

//view single item
router.get("/:movie_title", moviesService.getAMovie)

//add a new item
router.post('/', moviesService.createAMovie)

//updates an item
router.put('/:id', moviesService.updateAMovie)

//deletes an item
router.delete('/:movie_title', moviesService.deleteAMovie)


module.exports = router