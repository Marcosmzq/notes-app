import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_NEW_NOTE } from "../graphql/mutations";
import { GET_USER_NOTES } from "../graphql/querys";

import { Button, Form } from "semantic-ui-react";

const CrearNota = () => {
  const [values, setValues] = useState("");
  const [newNote, { error }] = useMutation(CREATE_NEW_NOTE, {
    onError(err) {
      console.log(err);
    },
    update(cache, { data: { createNote } }) {
      cache.modify({
        fields: {
          getUserNotes(existingNotes = []) {
            const newNoteRef = cache.writeQuery({
              data: createNote,
              query: GET_USER_NOTES,
            });
            return [...existingNotes, newNoteRef];
          },
        },
      });

      setValues("");
    },
    variables: {
      body: values,
    },
  });
  const handleOnChange = (event) => {
    setValues(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newNote();
  };

  return (
    <>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <h2>Crear una nueva nota:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Escribi el contenido de la nota"
            name="body"
            onChange={handleOnChange}
            value={values}
          />
          <Button type="submit" color="teal">
            Crear nueva nota
          </Button>
        </Form.Field>
      </Form>
    </>
  );
};

export default CrearNota;
