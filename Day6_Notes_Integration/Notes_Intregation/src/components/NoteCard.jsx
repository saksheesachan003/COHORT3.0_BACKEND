import React from "react";

const NoteCard = ({ note, deleteNote, noteForUpdate, isEditing }) => {
  return (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border bg-slate-900/60 p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-indigo-500/10 ${
        isEditing
          ? "border-indigo-500 ring-2 ring-indigo-500/40"
          : "border-slate-800 hover:border-slate-700"
      }`}
    >
      <h2 className="text-lg font-semibold break-words text-white">
        {note.title}
      </h2>

      <p className="line-clamp-4 flex-1 text-sm leading-relaxed break-words text-slate-400">
        {note.description}
      </p>

      <div className="flex gap-2 border-t border-slate-800 pt-3">
        <button
          onClick={() => noteForUpdate(note)}
          className="flex-1 cursor-pointer rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-amber-300 transition hover:bg-amber-500 hover:text-slate-950"
        >
          Edit
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="flex-1 cursor-pointer rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
