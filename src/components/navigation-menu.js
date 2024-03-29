import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

import {
  withBackgroundImage,
  menuDesktop,
  logoContainer,
  logoLarge as logoLargeStyles,
  logoSmall as logoSmallStyles,
  menuDesktopItemsContainer,
  openButton,
  menuMobile,
  isOpen,
  menuMobileContainer,
  closeButtonContainer,
  closeButton,
  menuMobileItemsContainer,
} from "./navigation-menu.module.scss"

import menu from "../content/_configuration/navigation-menu.yaml"

const NavigationMenu = ({ hasBackgroundImage }) => {
  const [state, setState] = useState({
    isMobileMenuOpen: false,
  })

  const data = useStaticQuery(graphql`
    query LogoQuery {
      logoLarge: file(absolutePath: { regex: "/logo.png/" }) {
        childImageSharp {
          fixed(width: 250, quality: 95) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
      logoLargeWhite: file(absolutePath: { regex: "/logo-white.png/" }) {
        childImageSharp {
          fixed(width: 250, quality: 95) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
      logoSmall: file(absolutePath: { regex: "/logo-circle.png/" }) {
        childImageSharp {
          fixed(width: 80, quality: 95) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)
  const logoLarge = hasBackgroundImage
    ? data?.logoLargeWhite?.childImageSharp?.fixed
    : data?.logoLarge?.childImageSharp?.fixed
  const logoSmall = data?.logoSmall?.childImageSharp?.fixed

  function toggleMobileMenu() {
    setState({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })
  }

  return (
    <div className={hasBackgroundImage ? withBackgroundImage : ""}>
      <div className={menuDesktop}>
        <div className={logoContainer}>
          <Link to="/">
            <div className={logoLargeStyles}>
              {logoLarge && <Image fixed={logoLarge} alt="SI logo" />}
            </div>
            <div className={logoSmallStyles}>
              {logoSmall && <Image fixed={logoSmall} alt="SI logo" />}
            </div>
          </Link>
        </div>
        <div className={menuDesktopItemsContainer}>
          {menu.items.map(item => {
            return (
              <Link
                className="golden"
                to={item.url}
                key={`nav_item_${item.url}`}
              >
                {item.title}
              </Link>
            )
          })}
        </div>
        <div className={openButton}>
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleMobileMenu}
            onKeyPress={toggleMobileMenu}
            tabIndex={0}
            role="button"
            size="2x"
            aria-label="Open navigation menu"
          />
        </div>
      </div>
      <div className={`${menuMobile} ${state.isMobileMenuOpen ? isOpen : ""}`}>
        <div className={menuMobileContainer}>
          <div className={closeButtonContainer}>
            <div
              className={closeButton}
              onClick={toggleMobileMenu}
              onKeyPress={toggleMobileMenu}
              tabIndex={0}
              role="button"
              aria-label="Close navigation menu"
            >
              <FontAwesomeIcon icon={faTimes} size="2x" />
            </div>
          </div>
          <div className={menuMobileItemsContainer}>
            {menu.items.map(item => {
              return (
                <Link
                  className="golden"
                  to={item.url}
                  key={`nav_item_mobile_${item.url}`}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationMenu
