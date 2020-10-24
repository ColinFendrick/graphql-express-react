import gql from 'graphql-tag';

export default gql `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      message
    }
  }
`;
