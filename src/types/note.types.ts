export interface NoteData {
  id: number;
  title: String;
  content: String;
  userId: number;
}

export interface CreateNoteDTO {
  title: string;
  content: string;
  userId: number;
}
