const AllPosts = `
  query AllPosts {
    posts(orderBy: publishedAt_DESC) {
      id
      excerpt
      slug
      title
      date
    }
  }
`

const SinglePost = `
  query SinglePost($slug: String!) {
    post(where: { slug: $slug }) {
      createdAt
      updatedAt
      publishedAt
      title
      slug
      date
      excerpt
      content {
        raw
        html
        markdown
        text
      }
      tags
      createdBy {
        ... on User {
          remoteTypeName: __typename
          remoteId: id
        }
      }
      updatedBy {
        ... on User {
          remoteTypeName: __typename
          remoteId: id
        }
      }
      publishedBy {
        ... on User {
          remoteTypeName: __typename
          remoteId: id
        }
      }
      coverImage {
        url
        width
        height
      }
      author {
        ... on Author {
          remoteTypeName: __typename
          remoteId: id
          name
          title
          picture {
            url
            width
            height
          }
        }
      }
      scheduledIn {
        ... on ScheduledOperation {
          remoteTypeName: __typename
          remoteId: id
        }
      }

    }
  }
`

export { AllPosts, SinglePost }
