import { gql } from "graphql-request";

const query = gql`
    id
    link {
      externalUrl
      displayText
      page {
        ... on Page {
          id
          slug
        }
      }
    }
    navId
  
`;

const SingleNav = gql`
query Navigation() {
  main: navigation(where: {navId: "main"}) {
    ${query}
  
  }
  social: navigation(where: {navId: "social"}) {
    ${query}
  }
}



`;

export { SingleNav };
