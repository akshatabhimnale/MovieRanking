const express = require("express");
const router = express.Router();
const { getAllMovies, userRating } = require("../controller/userController");

router.route("/").get(getAllMovies);
router.route("/rating/:id").post(userRating);
module.exports = router;
