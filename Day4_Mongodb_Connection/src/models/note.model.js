const mongoose = require("mongoose");

// Created a schema  class ( new used bcs of class)
let notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
  },
});

// created model
const NotesModel = mongoose.model("notes", notesSchema);

// now created post api ( bcs taking data in body from frontend)



module.exports = NotesModel;
