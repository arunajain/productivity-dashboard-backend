export interface NoteDataRow {
  id: number;
  title: string;
  content: string;
}

export interface NoteDTO {
  title: string;
  content: string;
  userId: number;
}

export interface UpdateNoteDTO {
  noteId: number;
  title?: string;
  content?: string;
  userId: number;
}

export interface NoteResponse {
  noteId: number;
  title: string;
  content: string;
}
