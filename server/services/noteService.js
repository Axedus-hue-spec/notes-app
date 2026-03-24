import { Note } from "../models/models.js";

class NoteService {
    async findByUser(userId) {
        const notes = await Note.findAll({ where: {userId}});
        return notes;
    }

    async create(content, user) {
        const newNote = await Note.create({
            content,
            userId: user.id,
            author: user.username,
        })

        return "Заметка создана"
    }

    async delete(noteId) {
        const note = await Note.findByPk(noteId);
        await note.destroy();

        return "Заметка удалена"
    }

    async update(noteId, content) {
        console.log(noteId)
        await Note.update({content}, {where: {id: noteId} });
        return "Заметка обновлена"
    }
}

export const noteService = new NoteService();