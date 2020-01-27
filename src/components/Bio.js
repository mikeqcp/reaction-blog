import React from 'react'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2)};
`;

const Avatar = styled.img`
  margin-right: ${rhythm(1 / 2)};
  margin-bottom: 0;
  width: ${rhythm(2)};
  height: ${rhythm(2)};
  border-radius: 50%;
`

const Text = styled.div`
  text-align: left;
  
  p {
    margin-bottom: 0;
  }
`;

export default ({ settings }) => (
  <Container>
    <Avatar
      src={settings.author_avatar.imgix_url}
      alt={settings.author_name}
    />
    <Text dangerouslySetInnerHTML={{ __html: settings.author_bio }} />
  </Container>
)
