import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import Grid from "../components/sections/grid"
import Card from "../components/card"

const ProjectsGroupTemplate = ({ pageContext, data, location }) => {
  const { nodes, totalCount } = data.allMarkdownRemark
  const tags = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageContext.tag}
        subtitle={`${totalCount} project${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO title={`${pageContext.tag} projects`} />
        <FeaturedTagsList isProjectCategories tags={tags} />
        <BaseSection>
          <Grid>
            {nodes.map(project => {
              return (
                <Card
                  key={`project_group_card_${project.fields.slug}`}
                  url={project.fields.slug}
                  image={
                    project.frontmatter?.featuredImage?.childImageSharp?.fluid
                  }
                  title={
                    project.frontmatter.card?.title || project.frontmatter.title
                  }
                  subtitle={project.frontmatter.tags.join(" / ")}
                  content={
                    project.frontmatter.card?.description ||
                    project.frontmatter.subtitle
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

export default ProjectsGroupTemplate

export const pageQuery = graphql`
  query projectByCategory($tag: String) {
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "project" } }
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
      filter: { fields: { contentType: { eq: "project" } } }
      limit: 2000
    ) {
      group(field: frontmatter___category) {
        fieldValue
      }
    }
  }
`
