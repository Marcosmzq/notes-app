import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export const CREATE_NEW_NOTE = gql`
  mutation createNote($body: String!) {
    createNote(body: $body) {
      id
      body
      createdAt
      username
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($noteId: ID!, $bodyUpdate: String!) {
    updateNote(bodyUpdate: $bodyUpdate, noteId: $noteId) {
      id
      body
      createdAt
      username
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($noteId: ID!) {
    deleteNote(noteId: $noteId) 
  }
`;
