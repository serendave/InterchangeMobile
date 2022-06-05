import { gql } from '@apollo/client';

export const joinEvent = gql`
  mutation JoinEvent($joinEventInput: JoinEventInput!) {
    joinEvent(joinEventInput: $joinEventInput) {
      id
      name
    }
  }
`;
