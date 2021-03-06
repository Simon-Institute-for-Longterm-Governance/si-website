import React from "react"
import { Link } from "gatsby"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import HeaderBackground from "./header-background"
import NavigationMenu from "./navigation-menu"
import Footer from "./sections/footer"

import styles from "./page-layout.module.scss"

const PageLayout = ({
  location,
  title,
  subtitle,
  headerLinks,
  children,
  backLink,
  backLinkText,
  withImageBackgroundHeader,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  const className = isRootPath ? styles.homepage : styles.subpage

  const headerContent = (
    <div className={`global-content-wrapper ${styles.headerContentWrapper}`}>
      <NavigationMenu
        hasBackgroundImage={withImageBackgroundHeader}
      ></NavigationMenu>
      <div className={styles.textContent}>
        <h1>{title}</h1>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {headerLinks && <div className={styles.headerLinks}>{headerLinks}</div>}
      </div>
    </div>
  )

  return (
    <article className={`${styles.allPages} ${className}`}>
      <header
        className={withImageBackgroundHeader ? styles.hasImageBackground : ""}
      >
        {withImageBackgroundHeader ? (
          <HeaderBackground>{headerContent}</HeaderBackground>
        ) : (
          headerContent
        )}
      </header>
      <main>
        {backLink && (
          <Link to={backLink} className="golden backLink">
            <FontAwesomeIcon icon={faChevronLeft} /> {backLinkText}
          </Link>
        )}
        {children}
      </main>
      <Footer />
    </article>
  )
}

export default PageLayout
