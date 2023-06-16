const AllPages = `
  query AllPages {
    pages {
      id
      slug
      title
    }
  }
`

const SinglePage = `
  query SinglePage($slug: String!) {
    page(where: { slug: $slug }) {
      title
      seoOverride {
        title
        image {
          height
          width
          url
        }
        description
      }
      content {
        html
        raw
      }
    }
  }
`

export { AllPages, SinglePage }
