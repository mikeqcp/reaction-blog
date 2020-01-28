import { fontSize, rhythm, scale } from '../../utils/typography'
import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { themeColor } from '../../utils/theme/getters'

const Container = styled.div`
  background-size: cover;
  background-position: right;
  width: 100%;
  height: ${rhythm(5)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
  ${fontSize(1.3)};
  color: ${themeColor('secondaryDark')}
`;

const Link = styled(GatsbyLink)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
  font-family: Montserrat, sans-serif;
`;

export const BigHeader = ({ title }) => (
  <Container>
    <Title>
      <Link to={'/'}>{title}</Link>
    </Title>
  </Container>
)
