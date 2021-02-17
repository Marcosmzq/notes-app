import { AuthenticationError } from "apollo-server";

import Note from "../../models/Notes";
import checkAuth from "../../utils/check-auth";

export default {
  Query: {
    async getUserNotes(_, { userId }, context) {
      const user = checkAuth(context);
      try {
        if (user.id === userId) {
          const userNotes = await Note.find({ user: userId }).sort({
            createdAt: -1,
          });
          return userNotes;
        } else {
          return "No podes buscar notas creadas por otros usuarios.";
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getNotes() {
      try {
        const notes = await Note.find().sort({ createdAt: -1 });
        return notes;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createNote(_, { body }, context) {
      const user = checkAuth(context);

      if (args.body.trim() === "") {
        throw new Error(
          "Por favor ingrese un contenido en la nota. Esta no puede estar vacia."
        );
      }

      const newNote = new Note({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const note = await newNote.save();

      return note;
    },
    async updateNote(_, { noteId, bodyUpdate }, context) {
      const user = checkAuth(context);

      if (args.bodyUpdate.trim() === "") {
        throw new Error(
          "Por favor ingrese un contenido en la nota. Esta no puede estar vacia."
        );
      }

      try {
        const note = await Note.findById(noteId);
        if (user.username === note.username) {
          await note.updateOne({
            $set: {
              body: bodyUpdate,
            },
          });
          const getNoteUpdated = await Note.findById(noteId);
          return getNoteUpdated;
        } else {
          throw new AuthenticationError(
            "No podés actualizar una nota que no es tuya."
          );
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteNote(_, { noteId }, context) {
      const user = checkAuth(context);

      try {
        const note = await Note.findById(noteId);
        if (user.username === note.username) {
          await note.delete();
          return "Nota eliminada correctamente.";
        } else {
          throw new AuthenticationError(
            "No podés eliminar una nota que no sea tuya."
          );
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
