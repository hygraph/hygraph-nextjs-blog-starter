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
  query SinglePage($slug: String!, $stage: Stage!) {
    page(where: { slug: $slug }, stage: $stage) {
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
