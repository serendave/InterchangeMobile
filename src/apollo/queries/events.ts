import { gql } from '@apollo/client';

export const events = gql`
  query GetEvents($getEventsInput: GetEventsInput) {
    events(getEventsInput: $getEventsInput) {
      id
      name
      description
      dateCreated
      location {
        latitude
        longitude
      }
      creator {
        id
        firstName
        lastName
      }
    }
  }
`;
