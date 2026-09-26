const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const notesRoute = require("./routes/notes.route");

const app = express();

connectDB();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}));

app.get("/", (req, res) => {
  res.send("ok got it");
});

app.use("/notes", notesRoute);

module.exports = app;