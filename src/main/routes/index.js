const express = require("express");
const router = express.Router();
const WorstMoviesController = require("../controllers/WorstMoviesController");

router.get("/", WorstMoviesController.home);

module.exports = router;
