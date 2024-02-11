const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const form = multer();
const cors = require("cors");
const path = require("path");

app.use(bodyParser.json());
//app.use(express.json());
app.use(form.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.use(cors());
app.use("/admin/api/", adminRoutes);
app.use("/user/api/", userRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("port is listening");
});
