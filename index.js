const { MongoClient } = require("mongodb");

// Replace with your connection string
require("dotenv").config();
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("notesApp");
    const notes = db.collection("notes");

    // Your code will go here soon!
    // Inside the try block, after defining notes
const pinned = await notes.find({ pinned: true }).toArray();
console.log(pinned);



  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
