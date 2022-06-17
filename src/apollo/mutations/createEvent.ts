import { gql } from '@apollo/client';

export const createEvent = gql`
  mutation CreateEvent($createEventInput: CreateEventInput!) {
    createEvent(createEventInput: $createEventInput) {
      id
      name
      description
      dateCreated
    }
  }
`;
