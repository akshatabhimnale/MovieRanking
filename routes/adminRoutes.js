const express = require("express");
const router = express.Router();

const {
  getAllMovies,
  getLogin,
  addMovie,
  deleteMovie,
} = require("../controller/adminController");

router.route("/login").post(getLogin);
router.route("/add-movie").post(addMovie);
router.route("/movie-list").get(getAllMovies);
router.route("/delete/:id").post(deleteMovie);

module.exports = router;
