import Typography from 'typography'
import theme from 'typography-theme-fairy-gates'
import { css } from 'styled-components'
import { theme as defaultTheme } from '../utils/theme/theme';

theme.overrideThemeStyles = () => ({
  h1: {
    color: defaultTheme.colors.header,
  },

  h2: {
    color: defaultTheme.colors.header,
  },

  h3: {
    color: defaultTheme.colors.header,
  },

  small: {
    color: defaultTheme.colors.header,
  },

  p: {
    color: defaultTheme.colors.paragraph,
  },

  a: {
    color: 'inherit',
    textShadow: 'none',
    backgroundImage: 'none'
  },

  body: {
    backgroundColor: defaultTheme.colors.white,
    color: defaultTheme.colors.paragraph
  },

  'a.gatsby-resp-image-link': {
    boxShadow: 'none'
  },
})

delete theme.googleFonts

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

export const fontSize = scale => css`
  font-size: ${typography.scale(scale).fontSize};
  line-height: ${typography.scale(scale).lineHeight};
`;
