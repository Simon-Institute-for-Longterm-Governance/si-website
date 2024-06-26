import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import { constructProjectTagUrl } from "../utils"

import CategoryLink from "../components/category-link"
import PageLayout from "../components/page-layout"
import BaseSection from "../components/sections/BaseSection"
import SideBySide from "../components/sections/SideBySide"
import Tabs from "../components/tabs"
import Seo from "../components/seo"

import { generateIdFromTitle, updateSrcSet } from "../utils"

const SubpageTemplate = ({ data, location }) => {
  const pageData = data.markdownRemark.frontmatter
  const mobileFeaturedImage = pageData.featuredImage?.mobile?.fluid
  const desktopFeaturedImage = pageData.featuredImage?.desktop?.fluid
  const seoFeaturedImage = pageData.featuredImage?.seo?.resize
  const category = pageData?.category
  const tags = pageData?.tags

  const tagLinks =
    tags &&
    tags.map(tag => {
      return (
        <Link
          className="golden"
          to={constructProjectTagUrl(tag)}
          key={`tag_link_${tag}`}
        >
          #{tag}
        </Link>
      )
    })

  const headerLinks = (
    <div>
      <div>{category && <CategoryLink>{category}</CategoryLink>}</div>
      <div>
        {tags &&
          tagLinks.map(tagLink => {
            return tagLink
          })}
      </div>
    </div>
  )

  if (desktopFeaturedImage) {
    desktopFeaturedImage.srcSet = updateSrcSet(
      desktopFeaturedImage.srcSet,
      1920
    )
  }

  const sources = [
    mobileFeaturedImage,
    {
      ...desktopFeaturedImage,
      media: `(min-width: 768px)`,
    },
  ]

  return (
    <PageLayout
      title={pageData.title}
      subtitle={pageData.subtitle}
      headerLinks={category && tags && headerLinks}
      location={location}
    >
      <Seo
        title={pageData.seo?.title || pageData.title}
        description={pageData.seo?.description || pageData.subtitle}
        image={seoFeaturedImage}
      />
      {desktopFeaturedImage && (
        <Image fluid={sources} alt={`${pageData.title} featured image`} />
      )}
      {pageData.textSections && pageData.textSections.length > 0 && (
        <>
          <Tabs
            titles={pageData.textSections.map(section => section.title)}
          ></Tabs>
          {pageData.textSections.map(textSection => {
            const id = generateIdFromTitle(textSection.title)
            return (
              <BaseSection id={id} key={`subpage_section_${id}`}>
                <SideBySide title={textSection.title}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textSection.content.html,
                    }}
                  ></div>
                </SideBySide>
              </BaseSection>
            )
          })}
        </>
      )}
    </PageLayout>
  )
}

export default SubpageTemplate

export const pageQuery = graphql`
  query subpageBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        seo {
          title
          description
        }
        title
        subtitle
        category
        tags
        featuredImage {
          desktop: childImageSharp {
            fluid(
              maxWidth: 1920
              maxHeight: 600
              fit: COVER
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
            }
          }
          mobile: childImageSharp {
            fluid(
              maxWidth: 768
              maxHeight: 600
              fit: COVER
              cropFocus: CENTER
            ) {
              ...GatsbyImageSharpFluid
            }
          }
          seo: childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
        textSections {
          content {
            html
          }
          title
        }
      }
    }
  }
`
