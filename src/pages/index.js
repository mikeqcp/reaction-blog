import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { fontSize, rhythm } from '../utils/typography'

const List = styled.ul`
  list-style: none;
  margin: 0;
`
const ListItem = styled.li`
  &:not(:first-child) {
    border-top: 1px solid;
  }
`
const Title = styled.h1`
  ${fontSize(.4)};
  line-height: 1.1;
`

const CreatedDate = styled.time`
  font-size: 80%;
`

const ItemBox = styled.article`
  li & *:last-child {
    margin-bottom: 29px;
  }
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_title',
    )
    const siteDescription = get(
      this,
      'props.data.cosmicjsSettings.metadata.site_description',
    )
    const posts = get(this, 'props.data.allCosmicjsPosts.edges')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={siteTitle}>
          <meta name="description" content={siteDescription} />
        </Helmet>
        <List>
          {posts.map(({ node }) => {
            const title = get(node, 'title') || node.slug
            return (
              <ListItem>
                <Link style={{ boxShadow: 'none' }} to={`posts/${node.slug}`}>
                <ItemBox key={node.slug}>
                  <Title style={{ marginBottom: rhythm(1 / 4), }}>

                      {title}

                  </Title>
                  <CreatedDate>{node.created}</CreatedDate>
                  <p
                    dangerouslySetInnerHTML={{ __html: node.metadata.description }}
                  />
                </ItemBox>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
    query IndexQuery {
        allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
            edges {
                node {
                    metadata {
                        description
                    }
                    slug
                    title
                    created(formatString: "DD MMMM, YYYY")
                }
            }
        }
        cosmicjsSettings(slug: { eq: "general" }) {
            metadata {
                site_title
                site_description
            }
        }
    }
`
