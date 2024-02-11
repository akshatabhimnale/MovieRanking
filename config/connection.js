const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://akshatabhimnale:Radhe12@mernstack.matsona.mongodb.net/";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } finally {
    await client.close();
  }
}
connectToMongoDB();
module.exports = { connectToMongoDB, client };
