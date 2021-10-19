const express = require('express');
const router = express.Router();


const showsService = require("../services/ShowsService")


//view list of items
router.get('/', showsService.getTVShows)


module.exports = router