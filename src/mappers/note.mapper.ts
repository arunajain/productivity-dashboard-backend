import type { NoteDataRow, NoteResponse } from "../types/note.types.js";

export const mapNote = (note: NoteDataRow): NoteResponse => {
  return {
    noteId: note.id,
    title: note.title,
    content: note.content,
  };
};

export const mapNotes = (notes: NoteDataRow[]): NoteResponse[] => {
  return notes.map(mapNote);
};
