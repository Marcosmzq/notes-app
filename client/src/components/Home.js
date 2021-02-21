import React, { useContext } from "react";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { GET_USER_NOTES } from "../graphql/querys";


import { Card, Icon, Grid, Transition, Message } from "semantic-ui-react";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";

import moment from "moment";

const Home = () => {

  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(GET_USER_NOTES, {
    variables: {
      userId: user.id,
    },
  });

  return (
    <>
      <Grid columns={2} divided>
        <Grid.Row>
          <Transition.Group>
            <Grid.Column>{user && <CreateNote />}</Grid.Column>
            <Grid.Column>
              {loading && (
                <div style={{ margin: 20 + "px" }}>
                  <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Content>
                      <Message.Header>Espera un momento.</Message.Header>
                      Estamos recopilando tus notas.
                    </Message.Content>
                  </Message>
                </div>
              )}
              {data && (
                <div style={{ margin: 20 + "px" }}>
                  <Message>
                    <Message.Content color="teal">
                      <Message.Header>Estas son tus notas</Message.Header>
                      ¡Podés crear todas las que quieras!
                    </Message.Content>
                  </Message>
                </div>
              )}
            </Grid.Column>
          </Transition.Group>
        </Grid.Row>
      </Grid>

      
      <Grid columns={3}>
        <Grid.Row>
          <Transition.Group>
            {data &&
              data.getUserNotes.map((note) => {
                return (
                  <Grid.Column>
                    <Card
                      key={note.id}
                      style={{ height: 250 + "px", marginTop: 20 + "px" }}
                    >
                      <Card.Content>
                        <Card.Header>{note.username}</Card.Header>
                        <Card.Meta>
                          {moment(note.createdAt).fromNow()}
                        </Card.Meta>
                        <Card.Description>{note.body}</Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <EditNote username={note.username} noteId={note.id} />
                          <DeleteNote noteId={note.id} userId={note.user} />
                        </div>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Home;
