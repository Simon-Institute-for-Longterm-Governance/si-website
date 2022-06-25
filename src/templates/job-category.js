import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import Grid from "../components/sections/grid"
import Card from "../components/card"

const JobsGroupTemplate = ({ pageContext, data, location }) => {
  const { nodes, totalCount } = data.allMarkdownRemark
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageContext.tag}
        subtitle={`${totalCount} job${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO title={`${pageContext.tag} jobs`} />
        <FeaturedTagsList isJobCategories tags={tags} />
        <BaseSection>
          <Grid>
            {nodes.map(job => {
              return (
                <Card
                  key={`job_group_card_${job.fields.slug}`}
                  url={job.fields.slug}
                  image={
                    job.frontmatter?.featuredImage?.childImageSharp?.fluid
                  }
                  title={
                    job.frontmatter.card?.title || job.frontmatter.title
                  }
                  subtitle={job.frontmatter.tags.join(" / ")}
                  content={
                    job.frontmatter.card?.description ||
                    job.frontmatter.subtitle
                  }
                />
              )
            })}
          </Grid>
        </BaseSection>
      </PageLayout>
    </div>
  )
}

export default JobsGroupTemplate

export const pageQuery = graphql`
  query jobByCategory($tag: String) {
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "job" } }
        frontmatter: { category: { in: [$tag] } }
      }
      limit: 2000
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          subtitle
          card {
            title
            description
          }
          category
          tags
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 500, maxHeight: 290) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    tagsGroup: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "job" } } }
      limit: 2000
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`
