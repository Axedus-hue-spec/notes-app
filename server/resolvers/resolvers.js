import { noteService } from "../services/noteService.js";
import { userService } from "../services/userService.js";

export const resolvers = {
    Query: {
        notesByUser: async (_, __, { user }) => {
            if (!user) {
                throw new Error("Пользователь не авторизован")
            }

            return noteService.findByUser(user.id);
        },
    },
    Mutation: {
        registration: async (_, {user: input}) => {
            try {
                return userService.registration(input);
            } catch(e) {
                console.log(e);
            }
        },
        login: async (_, {user: input}) => {
            try {
                return userService.login(input);
            } catch(e) {
                console.log(e);
            }
        },
        createNote: async (_, {content}, {user}) => {
            if(!user) {
                throw new Error("Пользователь не авторизован")
            }
            try {
                return noteService.create(content, user);
            } catch(e) {
                console.log(e);
            }
        },
        deleteNote: async (_, {noteId}) => {
            try {
                return noteService.delete(noteId);
            } catch(e) {
                throw new Error("Ошибка")
            }
        },
        updateNote: async (_, {noteId, content}) => {
            try {
                return noteService.update(noteId, content);
            } catch(e) {
                throw new Error("Ошибка")
            }
        }
    }
}