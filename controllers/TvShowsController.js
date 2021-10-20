const express = require('express');
const router = express.Router();


const showsService = require("../services/ShowsService")


//view list of items

//add a new item
router.post('/', showsService.addAShow)

router.get('/', showsService.getTVShows)


module.exports = router