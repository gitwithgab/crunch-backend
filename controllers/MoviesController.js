const express = require('express')
const router = express.Router()


const movieService = require("../services/MoviesService")


//view list of items
router.get('/', movieService.getAllMovies)

//view single item
router.get('/:movie_title', movieService.getAMovie)

//add a new item
router.post('/', movieService.createAMovie)

//updates an item
router.put('/:id', movieService.updateAMovie)

//deletes an item
router.delete('/:movie_title', movieService.deleteAMovie)


module.exports = router