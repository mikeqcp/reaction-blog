import React from 'react'
import Helmet from 'react-helmet'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components';
import get from 'lodash/get'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { fontSize, rhythm, scale } from '../utils/typography'
import { themeColor } from '../utils/theme/getters'
import arrowIcon from './arrow_back.svg';

const Title = styled.h1``;

const ArrowIcon = styled.img.attrs(() => ({ src: arrowIcon}))`
  margin: 0;
  vertical-align: middle;
  margin-bottom: ${rhythm(.1)};
`;

const BackToPosts = styled(GatsbyLink)`
  display: inline-block;
  margin-bottom: ${rhythm(1)};
  vertical-align: middle;
`;
const Hero = styled.div`
  background-color: ${themeColor('primary')};
  background-image: url("${props => props.image}?w=2000");
  background-size: cover;
  background-position: center;
  margin-bottom: ${rhythm(0.6)};
  position: relative;
  width: 100%;
  height: ${rhythm(10)};
`;
const CreatedDate = styled.div`
  display: block;
  margin-bottom: ${rhythm(.6)};
  margin-top: ${rhythm(-.6)};
  ${fontSize(-.2)};
`;
const PostContent = styled.article`
  text-align: justify;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.cosmicjsPosts
    const siteTitle = get(this.props.data, 'cosmicjsSettings.metadata.site_title')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={`${post.title} | ${siteTitle}`} />

        <BackToPosts to="/"><ArrowIcon /> Back to Posts</BackToPosts>

        <Hero image={post.metadata.hero.imgix_url} />

        <Title>{post.title}</Title>
        <CreatedDate>{post.created}</CreatedDate>
        <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      created(formatString: "MMMM DD, YYYY")
      metadata {
        hero {
          imgix_url
        }
      }
    }
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
      }
    }
  }
`
