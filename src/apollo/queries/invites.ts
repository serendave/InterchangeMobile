import { gql } from '@apollo/client';

export const invites = gql`
  query GetInvites($getInvitesInput: GetInvitesInput!) {
    invites(getInvitesInput: $getInvitesInput) {
      id
      event {
        id
        name
        description
        dateCreated
      }
    }
  }
`;
