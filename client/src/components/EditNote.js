import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Modal, Icon, Input, Popup } from "semantic-ui-react";

import { UPDATE_NOTE } from "../graphql/mutations";

const EditarNota = ({ username, noteId }) => {

  const [inputValue, setInputValue] = useState("");

  const [updateNote, { error, data }] = useMutation(UPDATE_NOTE, {

    onError(err) {
      console.log(err);
    },
    variables: {
      bodyUpdate: inputValue,
      noteId: noteId,
    },
  });
  
  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    return event.preventDefault(), updateNote(), setInputValue("");
  };

  return (
    <Modal
      trigger={
        <Button basic color="teal">
          <Icon circular color="teal" name="edit" />
          Editar
        </Button>
      }
      header={`Nota de ${username}`}
      content={
        <>
          {data && (
            <div className="ui sucess message">
              <ul className="list">
                <li>
                  <p>
                    Esta nota ha sido modificada exitosamente recientemente.
                  </p>
                </li>
                <li>
                  <p>
                    Podés ver los cambios cerrando el modal, para hacerlo apreta
                    al costado del mismo
                  </p>
                </li>
                <li>
                  <p>También podés volver a editar la nota si querés.</p>
                </li>
              </ul>
            </div>
          )}
          {error && (
            <div className="ui error message">
              <ul className="list">
                <li>{error.graphQLErrors[0].message}</li>
              </ul>
            </div>
          )}
          <div style={{ height: 50 + "px", margin: 50 + "px" }}>
            <Input
              fluid
              icon="edit"
              iconPosition="left"
              placeholder="Escribí el contenido nuevo que queres que tenga esta nota"
              onChange={handleOnChange}
              value={inputValue}
            />
          </div>
        </>
      }
      actions={
        <>
          <div style={{ margin: 10 + "px" }}>
            <Button fluid basic color="teal" onClick={handleSubmit}>
              <Icon circular color="teal" name="edit" />
              Editar nota
            </Button>
          </div>
        </>
      }
    />
  );
}

export default EditarNota;
