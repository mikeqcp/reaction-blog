import { rhythm } from '../../utils/typography'
import { Link } from 'gatsby'
import React from 'react'

export const SmallHeader = ({ title }) => (
  <h3
    style={{
      fontFamily: 'Montserrat, sans-serif',
      marginTop: 0,
      marginBottom: rhythm(-1),
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: rhythm(24),
      paddingTop: `${rhythm(1.5)}`,
      textAlign: 'right'
    }}
  >
    <Link
      style={{
        boxShadow: 'none',
        textDecoration: 'none',
        color: 'inherit',
        marginRight: rhythm(3 / 4),
      }}
      to={'/'}
    >
      {title}
    </Link>
  </h3>
)
