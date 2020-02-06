import React from 'react'
import Helmet from 'react-helmet'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components';
import get from 'lodash/get'
import { graphql } from 'gatsby'
import Prism from 'prismjs';
import Image from 'gatsby-image';

import Layout from '../components/layout'
import { fontSize, rhythm, scale } from '../utils/typography'
import { themeColor } from '../utils/theme/getters'
import arrowIcon from './arrow_back.svg';

const Title = styled.h1``;

const ArrowIcon = styled.img.attrs(() => ({ src: arrowIcon}))`
  margin: 0;
  vertical-align: middle;
  margin-bottom: ${rhythm(.1)};
  margin-right: ${rhythm(.2)};
`;

const BackToPosts = styled(GatsbyLink)`
  display: inline-block;
  margin-bottom: ${rhythm(1)};
  vertical-align: middle;
`;
const Hero = styled(Image)`
  margin-bottom: ${rhythm(0.6)};
  position: relative;
  width: 100%;
  height: ${rhythm(10)};
`;
const CreatedDate = styled.time`
  display: block;
  margin-bottom: ${rhythm(.6)};
  margin-top: ${rhythm(-.3)};
  ${fontSize(-.2)};
`;
const PostContent = styled.article`
  margin-top: ${rhythm(2)};
  text-align: justify;
`;

const formatCode = html => html.replace(/<pre>/g, '<pre class="language-javascript">');

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    document.querySelectorAll('pre').forEach(codeBlock => Prism.highlightElement(codeBlock));
  }

  render() {
    const post = this.props.data.cosmicjsPosts

    const siteTitle = get(this.props.data, 'cosmicjsSettings.metadata.site_title')
    const location = get(this, 'props.location')

    return (
      <Layout location={location}>
        <Helmet title={`${post.title} | ${siteTitle}`}>
          <meta name="description" content={post.metadata.description} />
        </Helmet>

        <BackToPosts to="/"><ArrowIcon />Back to Posts</BackToPosts>

        <Hero fluid={post.metadata.hero.imgix.childImageSharp.fluid} />

        <Title>{post.title}</Title>
        <CreatedDate>{post.created}</CreatedDate>
        <PostContent dangerouslySetInnerHTML={{ __html: formatCode(post.content) }} />
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
        description
        hero {
          imgix {
              childImageSharp {
                  fluid(maxWidth: 1000) {
                      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                      ...GatsbyImageSharpFluid
                  }
              }
          }
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
