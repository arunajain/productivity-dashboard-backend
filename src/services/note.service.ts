import Note from "../repositories/Note.js";
import { AppError } from "../errors/AppError.js";
import type {
  NoteDTO,
  UpdateNoteDTO,
  NoteResponse,
} from "../types/note.types.js";
import type { ApiResponse } from "../types/common.types.js";
import { mapNotes, mapNote } from "../mappers/note.mapper.js";
class NoteService {
  static async createNote(data: NoteDTO): Promise<ApiResponse<NoteResponse>> {
    const { title, content, userId } = data;
    const note = await Note.createNote(title, content, userId);
    return {
      success: true,
      message: "Note created successfully",
      data: {
        noteId: note.id,
        title: note.title,
        content: note.content,
      },
    };
  }

  static async getNotesByUserId(
    userId: number,
  ): Promise<ApiResponse<NoteResponse[]>> {
    const notes = await Note.getByUserId(userId);
    const notesResultResponse = mapNotes(notes);
    return {
      success: true,
      message: "Notes retrieved successfully",
      data: notesResultResponse,
    };
  }

  static async getNoteById(noteId: number): Promise<ApiResponse<NoteResponse>> {
    const note = await Note.getById(noteId);
    if (!note) {
      throw new AppError("Note not found", 404);
    }
    const noteResultResponse = mapNote(note);
    return {
      success: true,
      message: "Note retrieved successfully",
      data: noteResultResponse,
    };
  }

  static async deleteNoteById(noteId: number): Promise<ApiResponse> {
    const existingNote = await Note.getById(noteId);
    if (!existingNote) {
      throw new AppError("Note not found", 404);
    }
    await Note.deleteById(noteId);
    return {
      success: true,
      message: "Note deleted successfully",
    };
  }

  static async updateNoteById(
    data: UpdateNoteDTO,
  ): Promise<ApiResponse<NoteResponse>> {
    const { userId, noteId, title = "", content = "" } = data;
    const existingNote = await Note.getById(noteId);
    if (!existingNote) {
      throw new AppError("Note not found", 404);
    }

    const updatedTitle = title?.trim() || existingNote.title;
    const updatedContent = content?.trim() || existingNote.content;

    const updatedNote = await Note.updateById({
      userId,
      noteId,
      title: updatedTitle,
      content: updatedContent,
    });
    const noteResultResponse = mapNote(updatedNote);
    return {
      success: true,
      message: "Note updated successfully",
      data: noteResultResponse,
    };
  }
}

export default NoteService;
