import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { rhythm } from '../utils/typography'

import { BigHeader } from './bigHeader'
import { SmallHeader } from './smallHeader'
import { theme } from '../utils/theme/theme'
import Bio from './Bio'

const Footer = styled.footer`
  text-align: center;
  padding: 0 20px 0 0;
`;

const Content = styled.div`
  min-height: calc(100vh - 42px);
  padding-top: ${rhythm(1.5)};
  padding-bottom: ${rhythm(1.5)};
  
  pre {
    font-size: ${rhythm(.6)};
    margin-bottom: ${rhythm(1)};
  }
`;

const WidthWrapper = styled.div`
  padding-left:  ${rhythm(3 / 4)};
  padding-right:  ${rhythm(3 / 4)};
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(24)};
`;

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            site_heading
            site_description
            author_name
            author_bio
            author_avatar {
              imgix_url
            }
          }
        }
      }
    `}
    render={data => {
      const siteTitle = data.cosmicjsSettings.metadata.site_heading
      const siteDescription = data.cosmicjsSettings.metadata.site_description
      const author = data.cosmicjsSettings.metadata;

      let rootPath = `/`
      let postsPath = `/posts`

      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }

      const isHome = location.pathname === rootPath || location.pathname === postsPath;
      return (
        <ThemeProvider theme={theme}>
          {isHome ? <BigHeader title={siteTitle} subtitle={siteDescription}/> : <SmallHeader title={siteTitle} /> }
          <Content>
            <WidthWrapper>
              {children}
            </WidthWrapper>
          </Content>
          <Footer>
            <WidthWrapper>
              <Bio settings={author} />
            </WidthWrapper>
          </Footer>
        </ThemeProvider>
      )
    }}
  />
)
