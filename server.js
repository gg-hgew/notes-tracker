const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
let notes;

async function connectDB() {
  await client.connect();
  const db = client.db("notesApp");
  notes = db.collection("notes");
  console.log("✅ Connected to MongoDB");
}
connectDB();

// 📍 GET all notes
app.get("/notes", async (req, res) => {
  const data = await notes.find().toArray();
  res.json(data);
});

// 📝 POST new note
app.post("/notes", async (req, res) => {
  const note = req.body;
  await notes.insertOne(note);
  res.json({ message: "Note added!", note });
});

// 🔄 Update note
app.put("/notes/:title", async (req, res) => {
  const { title } = req.params;
  const updates = req.body;
  await notes.updateOne({ title }, { $set: updates });
  res.json({ message: "Note updated!" });
});

// ❌ Delete note
app.delete("/notes/:title", async (req, res) => {
  const { title } = req.params;
  await notes.deleteOne({ title });
  res.json({ message: "Note deleted!" });
});

app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
