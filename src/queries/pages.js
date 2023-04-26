import { gql } from "graphql-request";

const AllPages = gql`
  query AllPages {
    pages {
      id
      slug
      title
    }
  }
`;

const SinglePage = gql`
  query SinglePage($slug: String!) {
    page(where: { slug: $slug }) {
      title
      seo {
        ... on Seo {
          remoteTypeName: __typename
          remoteId: id
          title
          description
          image {
            url
          }
        }
      }
      content {
        html
        raw
      }
    }
  }
`;

export { AllPages, SinglePage };
