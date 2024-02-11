const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllMovies,
  getLogin,
  addMovie,
  deleteMovie,
  addRating,
} = require("../controller/adminController");

let storage = multer.diskStorage({
  destination: "public/img",
  filename: (req, file, cd) => {
    cb(null, file.originalname);
  },
});
let upload = multer({
  storage: storage,
});
router.route("/login").post(getLogin);
router.route("/add-movie").post(upload.single("files"), addMovie);
router.route("/movie-list").get(getAllMovies);
router.route("/delete/:id").post(deleteMovie);

module.exports = router;
