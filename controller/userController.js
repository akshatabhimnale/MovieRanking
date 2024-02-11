const { ObjectId } = require("mongodb");
const { connectToMongoDB, client } = require("../config/connection");
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

const userRating = async (req, res) => {
  try {
    const id = req.params.id;
    const { your_name, detail_review, movie_rating } = req.body;
    const cl = await client.connect();
    const db = cl.db("MERNSTACK");
    const collection = db.collection("Rating");
    // if (!user_name || !desc || !rating) {
    //   res.send(400).json({ error: "All details are mandatory" });
    // }

    const newRec = {
      id: id,
      user_name: your_name,
      desc: detail_review,
      rating: movie_rating,
    };

    const newRecRating = await collection.insertOne(newRec);
    if (newRecRating) {
      const avg = await collection
        .aggregate([
          { $match: { id: id } },
          { $group: { _id: "$id", rating: { $avg: "$rating" } } },
        ])
        .toArray((err, result) => {
          if (err) {
            console.log(err);
          }
          res.send(result[0].average);
        });
      const arrayObject = avg.map((obj) => obj.rating);

      console.log(arrayObject[0]);
      const newcollection = db.collection("Movies");
      const updateRating = await newcollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { movie_rating: arrayObject[0] } }
      );
      res.status(200).send(avg);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllMovies, userRating };
