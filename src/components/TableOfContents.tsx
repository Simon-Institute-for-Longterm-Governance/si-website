import React from "react"
import { Link } from "gatsby"

import BaseSection from "./sections/BaseSection"

import {
  tableOfContentsSection,
  oneLineSection,
  tableOfContents,
  oneLine as oneLineStyles,
  multipleLines,
} from "./table-of-contents.module.scss"

interface TableOfContents {
  links: {
    title?: string
    url: string
  }[]
  oneLine?: boolean
}

const TableOfContents = ({ links, oneLine }: TableOfContents) => {
  return (
    <BaseSection
      className={`${tableOfContentsSection} ${oneLine && oneLineSection}`}
      id="table-of-contents"
    >
      <div
        className={`${tableOfContents} ${
          oneLine ? oneLineStyles : multipleLines
        }`}
      >
        <ul>
          {links
            .filter(link => !!link.title)
            .map(link => {
              return (
                <li key={`tbc_${link.url}`}>
                  <Link className="golden" to={link.url}>
                    {link.title}
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    </BaseSection>
  )
}

export default TableOfContents
