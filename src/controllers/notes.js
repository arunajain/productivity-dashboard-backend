import Notes from '../models/notes.js';

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.user.id;
        const newNote = await Notes.createNote(title, content, user_id);
        res.status(201).json({ msg: 'Note created successfully', note: newNote });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getNotesByUserId = async (req, res) => {
    try {
        const user_id = req.user.id;
        const notes = await Notes.getNotesByUserId(user_id);
        res.status(200).json({ notes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};  

export const deleteNote = async (req, res)  => {
    try {
        const note_id = req.params.id;
        const note = await Notes.getNoteById(note_id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });
        if (note.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        await Notes.deleteNoteById(note_id);
        res.status(200).json({ msg: 'Note deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const updateNote = async (req, res) => {
    try {
        const note_id = req.params.id;
        const { content } = req.body;
        const note = await Notes.getNoteById(note_id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });
        if (note.user_id !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
        const updatedNote = await Notes.updateNoteById(note_id, title, content);
        res.status(200).json({ msg: 'Note updated successfully', note: updatedNote });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
