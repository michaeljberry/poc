import gql from 'graphql-tag'

const ALL_BLOGS_QUERY = gql`
  query ContentAPI {
  BlogCollection(limit: 1) {
    title
    urlMap
    author {
      owner {
        firstName
        lastName
        email
      }
    }
    postingDate
    modDate
    publishDate
    blogContent {
      json
    }
    image {
      fileName
      fileAsset {
        path
      }
      description
    }
  }
}
`

export { ALL_BLOGS_QUERY }