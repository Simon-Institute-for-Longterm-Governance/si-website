import React from "react"
import { graphql } from "gatsby"

import PageLayout from "../components/page-layout"
import SEO from "../components/seo"
import FeaturedTagsList from "../components/featured-tags-list"
import BaseSection from "../components/sections/base"
import CardsWithText from "../components/sections/cards-with-text"
import Card from "../components/card"
import { updateSrcSet } from "../utils"

const JobsPage = ({ data, location }) => {
  const pageData = data.jobsPage.nodes[0].frontmatter
  const { nodes, totalCount } = data.jobs
  const categories = data.tagsGroup.group.map(tag => tag.fieldValue)

  return (
    <div>
      <PageLayout
        title={pageData.title}
        subtitle={`${totalCount} job${totalCount === 1 ? "" : "s"}`}
        location={location}
      >
        <SEO
          title={pageData.seo?.title || pageData.title}
          description={pageData.seo?.description || pageData.subtitle}
        />
        <FeaturedTagsList isJobCategories tags={categories} />
        {pageData.jobsByCategories.map(jobsByCategory => {
          const jobs = nodes.filter(
            job =>
              job.frontmatter.category === jobsByCategory.category
          )
          const jobCards = jobs.map(job => {
            const jobImage =
              job.frontmatter?.featuredImage?.childImageSharp?.fluid
            if (jobImage) {
              jobImage.srcSet = updateSrcSet(jobImage?.srcSet, 750)
            }
            return (
              <Card
                key={`job_page_card_${job.fields.slug}`}
                url={job.fields.slug}
                image={jobImage}
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
          })

          return (
            <BaseSection key={`section_${jobsByCategory.title}`}>
              <CardsWithText
                orientation="cards-full-width"
                title={jobsByCategory.title}
                description={jobsByCategory.description}
                cards={jobCards}
                headingWeight={2}
              />
            </BaseSection>
          )
        })}
      </PageLayout>
    </div>
  )
}

export default JobsPage

export const pageQuery = graphql`
  query {
    jobsPage: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/custom-page/jobs.md/" } }
    ) {
      nodes {
        frontmatter {
          seo {
            title
            description
          }
          title
          subtitle
          jobsByCategories {
            category
            title
            description
          }
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "job" } } }
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
              fluid(
                maxWidth: 500
                maxHeight: 290
                fit: COVER
                cropFocus: CENTER
              ) {
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
