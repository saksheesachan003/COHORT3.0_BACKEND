const express = require("express");
const connectDb = require("./config/db");
const NotesModel = require("./models/note.model");

connectDb();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Ok, Now running...");
});

app.post("/create", async (req, res) => {
    let data = req.body;

    // extracts title and desc from data
    let {title, description} = data;

    // now return in mongodb data 
    const newNote = await NotesModel.create({
        title,
        description
    })

    console.log(data);

    res.send({
        success : true,
        message: "Note created successfully",
        data: newNote
    })
})

module.exports = app;


