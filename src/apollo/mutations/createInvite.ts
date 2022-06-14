import { gql } from '@apollo/client';

export const createInvite = gql`
  mutation CreateInvite($createInviteInput: CreateInviteInput!) {
    createInvite(createInviteInput: $createInviteInput) {
      id
      event {
        id
        name
      }
      user {
        id
        email
      }
    }
  }
`;
