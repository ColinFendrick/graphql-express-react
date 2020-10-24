import gql from 'graphql-tag';

export default gql `
  mutation SubmitPost($input: PostInput!) {
    submitPost(input: $input) {
      id
    }
  }
`;
