const express = require("express");
const router = express.Router();
const WorstMoviesController = require("../controller/WorstMoviesController");

router.get("/", WorstMoviesController.home);

module.exports = router;
