import { theme as chakraTheme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const fonts = {
  ...chakraTheme.fonts,
  body: `IBM Plex Sans,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `Libre Baskerville,Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  mono: `IBM Plex Mono,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  logo: `Cormorant Garamond,Georgia,Garamond,serif`,
};

const breakpoints = createBreakpoints({
  sm: '600px',
  md: '1265px',
  lg: '1440px',
  xl: '1440px',
  '2xl': '1440px',
});

const overrides = {
  fonts,
  breakpoints,
  fontWeights: {
    normal: 300,
    medium: 600,
    bold: 700,
  },
  fontSizes: {
    xs: '11px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '32px',
    '5xl': '44px',
    '6xl': '60px',
  },
  shadows: {
    outline: '0 0 0 3px #FC8181',
  },
  colors: {
    neutral: {
      raisin_black: {
        light: '#222226',
        medium: '#202023',
        dark: '#1D1D20',
      },
      jet: {
        light: '#36373C',
        medium: '#323237',
        dark: '#303036',
      },
      onyx: {
        light: '#4E4F55',
        medium: '#404146',
        dark: '#3B3C41',
      },
      timberwolf: {
        light: '#E2E2DF',
        medium: '#D9D8D4',
        dark: '#D5D4D0',
      },
      amaranth: {
        light: '#E05269',
        medium: '#DB324D',
        dark: '#DA2F4B',
      },
      green_blue_crayola: {
        light: '#069DEF',
        medium: '#058ED9',
        dark: '#0583C7',
      },
      pacific_blue: {
        light: '#2CB9DD',
        medium: '#22AED1',
        dark: '#1FA1C1',
      },
      minion_yellow: {
        light: '#F4E27B',
        medium: '#F2DC5D',
        dark: '#F1DA55',
      },
    },
    semantic: {
      blue: {
        light: '#33AAFF',
        medium: '#0496FF',
        dark: '#0083E0',
      },
      green: {
        light: '#2EDC68',
        medium: '#20BF55',
        dark: '#1B9D46',
      },
      red: {
        light: '#EC465A',
        medium: '#E71D36',
        dark: '#CB152B',
      },
      orange: {
        light: '#FEA520',
        medium: '#F18F01',
        dark: '#CB7A01',
      },
    },
    accent: {
      radical_red: {
        light: '#FF4778',
        medium: '#FF3368',
        dark: '#FF1F5A',
      },
      light_coral: {
        light: '#FF8587',
        medium: '#FF686B',
        dark: '#FF5C5F',
      },
    },
    chkbox: {
      200: '#E05269',
      500: '#DB324D',
    },
  },
  components: {
    Divider: {
      // style object for base or default style
      baseStyle: { opacity: 0.6, borderColor: 'inherit' },
      // styles for different sizes ("sm", "md", "lg")
      sizes: {
        sm: {
          borderWidth: '1px',
        },
        md: {
          borderWidth: '2px',
        },
        lg: {
          borderWidth: '3px',
        },
      },

      // styles for different visual variants ("outline", "solid")
      variants: {
        solid: {
          borderStyle: 'solid',
        },
        dashed: {
          borderStyle: 'dashed',
        },
        white: {
          borderStyle: 'solid',
          borderColor: 'whiteAlpha.800',
          opacity: 1,
        },
      },
      // default values for `size` and `variant`
      defaultProps: {
        size: 'sm',
        variant: 'solid',
        colorScheme: 'blackAlpha',
      },
    },
  },
};

const customTheme = extendTheme(overrides);

export default customTheme;
