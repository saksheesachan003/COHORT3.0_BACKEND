import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

const MIN_DESCRIPTION = 20;

const App = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const [updateNoteId, setUpdateNoteId] = useState(null);

  const [allNotes, setAllNotes] = useState([]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let getAllNotes = async () => {
    try {
      let res = await axios.get("http://localhost:3000/notes/allNotes");
      setAllNotes(res.data.data);
    } catch (error) {
      console.log("error in get all notes api", error);
      setError("Could not load notes. Is the backend running?");
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const resetForm = () => {
    setFormValues({
      title: "",
      description: "",
    });
    setUpdateNoteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (updateNoteId) {
        // api call for update note
        await axios.put(
          `http://localhost:3000/notes/${updateNoteId}`,
          formValues,
        );
      } else {
        // api call for create note
        await axios.post("http://localhost:3000/notes/create", formValues);
      }

      resetForm();
      getAllNotes();
    } catch (error) {
      console.log("error in save note", error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  let deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;

    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      if (id === updateNoteId) resetForm();
      getAllNotes();
    } catch (error) {
      console.log("error in delete note", error);
      setError("Could not delete the note");
    }
  };

  let noteForUpdate = (note) => {
    setUpdateNoteId(note._id);
    setFormValues({
      title: note.title,
      description: note.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const descLength = formValues.description.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6">
        {/* Header */}
        <header className="flex flex-col gap-1">
          <h1 className="bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
            Notes App
          </h1>
          <p className="text-slate-400">
            Capture your thoughts. {allNotes.length}{" "}
            {allNotes.length === 1 ? "note" : "notes"} saved.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur"
        >
          <h2 className="text-lg font-semibold text-white">
            {updateNoteId ? "Edit note" : "Create a new note"}
          </h2>

          <input
            onChange={handleChange}
            name="title"
            value={formValues.title}
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white placeholder-slate-500 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            type="text"
            placeholder="Title"
            required
          />

          <div className="flex flex-col gap-1">
            <textarea
              onChange={handleChange}
              name="description"
              value={formValues.description}
              rows={4}
              className="resize-none rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-base text-white placeholder-slate-500 transition outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
              placeholder="Description (at least 20 characters)"
              minLength={MIN_DESCRIPTION}
              required
            />
            <span
              className={`self-end text-xs ${
                descLength >= MIN_DESCRIPTION
                  ? "text-emerald-400"
                  : "text-slate-500"
              }`}
            >
              {descLength}/{MIN_DESCRIPTION} min
            </span>
          </div>

          {error && (
            <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button className="flex-1 cursor-pointer rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 active:scale-[0.98]">
              {updateNoteId ? "Update note" : "Add note"}
            </button>
            {updateNoteId && (
              <button
                type="button"
                onClick={resetForm}
                className="cursor-pointer rounded-lg border border-slate-700 px-4 py-3 font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Notes list */}
        {allNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center text-slate-500">
            No notes yet. Add your first one above ✍️
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allNotes.map((val) => (
              <NoteCard
                key={val._id}
                note={val}
                noteForUpdate={noteForUpdate}
                deleteNote={deleteNote}
                isEditing={val._id === updateNoteId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
