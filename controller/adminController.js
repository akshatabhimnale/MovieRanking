// login
//const express = require("express");
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { connectToMongoDB, client } = require("../config/connection");
const { ObjectId } = require("mongodb");
const multer = require("multer");

const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const cl = await client.connect();
    const db = cl.db("MERNSTACK");
    const collection = db.collection("Logins");
    const emailexists = await collection.findOne({ email: email });

    if (emailexists) {
      const pswdexists = await collection.findOne({ password: password });
      if (pswdexists) {
        res.status(200).json({
          status: true,
          message: "Logged In Successfully ! ",
        });
      } else {
        res.status(401).json({ status: false, message: "Wrong Password !" });
      }
    } else {
      res.status(401).json({ status: false, message: "Wrong Login Id !" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const addMovie = async (req, res) => {
  console.log("in addmovie function");

  try {
    const { movie_name, movie_detail } = req.body;
    console.log(movie_name);

    const cl = await client.connect();
    const db = cl.db("MERNSTACK");
    const collection = db.collection("Movies");

    // if (movie_name != "" || movie_details != "") {
    //   res.status(400).json({ error: "All details are mandatory" });
    // }
    const newMovie = {
      movie_name: movie_name,
      movie_details: movie_detail,
      movie_img: "",
      movie_rating: "0",
    };
    const addedmovie = await collection.insertOne(newMovie);
    if (addedmovie) {
      res.status(201).json({ message: "Movie Insterted" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const cl = await client.connect();
    const db = cl.db("MERNSTACK");
    const collection = db.collection("Movies");
    const allMovies = await collection.find().toArray();
    if (allMovies) {
      res.status(200).send(allMovies);
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const cl = await client.connect();
    const db = cl.db("MERNSTACK");
    const collection = db.collection("Movies");
    const allMovies = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log(allMovies);
    if (!allMovies) {
      res.status(400).send("Id Not Found in Database");
    }
    res.status(200).send(allMovies);
  } catch (error) {
    console.log(error);
  }
};
// List
// add
// delete
// export
module.exports = { getLogin, addMovie, getAllMovies, deleteMovie };
