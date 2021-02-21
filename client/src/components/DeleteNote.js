import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../graphql/mutations";
import { GET_USER_NOTES } from "../graphql/querys";

import { Button, Icon, Confirm } from "semantic-ui-react";

const DeleteNote = ({ noteId, userId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteNote] = useMutation(DELETE_NOTE, {
    update(cache, { data: { deleteNote } }) {
      cache.modify({
        fields: {
          getUserNotes(existingNotes = []) {
            const newCacheRef = cache.writeQuery({
              data: deleteNote,
              query: GET_USER_NOTES,
            });
            return [...existingNotes, newCacheRef];
          },
        },
      });
    },
    variables: {
      noteId: noteId,
    },
  });

  const handleDeleteNote = () => {
    return deleteNote(), setConfirmOpen(false);
  };
  return (
    <>
      <Button basic color="red" onClick={() => setConfirmOpen(true)}>
        <div>
          <Icon circular color="red" name="delete" />
          Borrar
        </div>
      </Button>
      <Confirm
        open={confirmOpen}
        content="¿Estas seguro que queres eliminar esta nota?"
        cancelButton="Cancelar"
        confirmButton="Borrar nota"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteNote}
      />
    </>
  );
};

export default DeleteNote;
