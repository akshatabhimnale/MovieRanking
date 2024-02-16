const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.use("/admin/api/", adminRoutes);
app.use("/user/api/", userRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("port is listening");
});
