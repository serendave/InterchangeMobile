import { gql } from '@apollo/client';

export const createItem = gql`
  mutation CreateItem($createItemInput: CreateItemInput!) {
    createItem(createItemInput: $createItemInput) {
      id
      name
      description
    }
  }
`;
