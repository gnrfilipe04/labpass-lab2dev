import { extendTheme } from 'native-base'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

// extend the theme
export const theme = extendTheme({ 
  config,
  colors: {
    primary: {
      '300': '#a855f7',
      '400': '#9333ea',
    },
    secondary: {
      '50': '#fafafa',
      '500': '#71717a',
      '600': '#262626',
      '900': '#070808',
    },
  },
})

  type MyThemeType = typeof theme;
  
  declare module 'native-base' {
    type ICustomTheme = MyThemeType
  }
