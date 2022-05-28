import { gql } from '@apollo/client';

export const categories = gql`
  query {
    categories {
      id
      name
    }
  }
`;
