import { gql } from '@apollo/client';

export const items = gql`
  query GetItems($getItemsInput: GetItemsInput) {
    items(getItemsInput: $getItemsInput) {
      id
      category {
        id
        name
      }
      name
      description
      dateCreated
      photos
    }
  }
`;
