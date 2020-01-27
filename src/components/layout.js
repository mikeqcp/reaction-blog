import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { BigHeader } from './bigHeader'
import { SmallHeader } from './smallHeader'
import { theme } from '../utils/theme/theme'
import { themeColor } from '../utils/theme/getters'
import Bio from './Bio'

const Footer = styled.footer`
  text-align: center;
  padding: 0 20px 80px 0;
`;
const Content = styled.div`
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)};
  min-height: calc(100vh - 42px);
`;

const WidthWrapper = styled.div`
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
          {isHome ? <BigHeader title={siteTitle} /> : <SmallHeader title={siteTitle} /> }
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
