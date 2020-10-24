import gql from 'graphql-tag';

export default gql `
  query GetPosts {
    posts {
      id
      author
      body
    }
  }
`;
