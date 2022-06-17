import { gql } from '@apollo/client';

export const getItem = gql`
  query GetItem($id: String!) {
    item(id: $id) {
      id
      user {
        id
        email
        firstName
        lastName
        photo
      }
      category {
        name
      }
      name
      description
      dateCreated
      photos
    }
  }
`;
