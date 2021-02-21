import { gql } from "@apollo/client";

export const GET_USER_NOTES = gql`
  query getUserNotes($userId: ID!) {
    getUserNotes(userId: $userId) {
      id
      body
      createdAt
      username
    }
  }
`;
