module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'transparent',
      current: 'currentColor',
      magenta: '#FF0075',
      blue: { DEFAULT: '#0076FF', dark: '#171923', darker: '#101114' },
      green: '#06D6A0',
      yellow: '#FFBE0B',
      xataPink: '#F10270',
      xataBlue: '#0076FF',
      xataYellow: '#FFBB00',
      xataGreen: '#06D6A0',
      gray: {
        lightest: '#CBD5E0',
        lighter: '#A0AEC0',
        light: '#718096',
        DEFAULT: '#4A5568',
        default: '#4A5568',
        'less-dark': '#2D3748',
        dark: '#171923',
        darker: '#111111',
        100: '#EDF2F7',
        200: '#E2E8F0',
        300: '#CBD5E0',
        400: '#A0AEC0',
        500: '#718096',
        600: '#4A5568',
        700: '#2D3748',
        800: '#1A202C',
        900: '#171923'
      }
    },
    extend: {
      gridTemplateColumns: {
        'blog-list-3': 'repeat(3, minmax(0, 1fr))',
        'blog-list-2': 'repeat(2, minmax(0, 1fr))'
      },
      fontSize: {
        h1: '5.625rem',
        h2: '4.187rem',
        h3: '3.125rem',
        h4: '1.75rem',
        p: '1.75rem',
        'xata-xl': '1.3125rem',
        '4.5xl': '2.375rem',
        '5.5xl': '3.5rem',
        '6.5xl': '4.1875rem'
      },
      lineHeight: {
        h1: 1.08,
        h2: 1.253,
        subtitle: 1.25,
        standard: '160%',
        mobile: '22px'
      },
      borderRadius: {
        '4xl': '32px',
        '5xl': '56px',
        small: '6px'
      },
      spacing: {
        13: '3.25rem',
        18: '4.5rem'
      },
      backgroundImage: {
        'black-gradient':
          'linear-gradient(109.84deg, #101010 0.02%, #000000 99.57%)',
        'blue-gradient':
          'radial-gradient(100% 145.52% at 0% 0%, #171923 2.49%, #171923 32.18%, #121212 100%)',
        'blue-gradient-alternative':
          'radial-gradient(297.47% 299.27% at -197.47% 0%, #171923 2.49%, #171923 32.18%, #121212 100%)',
        'gray-gradient':
          'radial-gradient(105.33% 105.33% at 84.2% -5.33%, #0D0D0D 0%, #121212 100%)',
        'gray-gradient-alternative':
          'radial-gradient(143.32% 143.32% at 93.11% -64.98%, #606060 0%, #000000 96.37%)',
        'gray-gradient-2': 'linear-gradient(90deg, #171923, #101114)',
        'gray-gradient-2-inverted': 'linear-gradient(-90deg, #171923, #101114)',
        'feature-gradient':
          'radial-gradient(106.16% 165.06% at 0% 0%, #171923 2.49%, #171923 32.18%, #121212 100%)',
        'quote-gradient':
          'linear-gradient(180deg, #0e0e0e 12.16%, rgb(15 15 15 / 0) 81.05%)',
        'rainbow-linear-gradient':
          'linear-gradient(92deg, #FF0075 -13.14%, #FFBE0B 31.98%, #59FCD2 72.38%, #0076FF 116.15%)',
        'rainbow-radial-gradient':
          'linear-gradient(to right, #FFBE0B 0%, #FF0075 31.19%, #0076FF 68.63%, #3BDCFF 100%)',
        'rainbow-radial-gradient-alternative':
          'linear-gradient(to right, #FFBE0B 0%, #FF0075 31.19%, #0076FF 68.63%, #06D6A0 100%)',
        'rainbow-radial-gradient-diagonal':
          'linear-gradient(165deg, #FFBE0B 0%, #FF0075 31.19%, #0076FF 68.63%, #3BDCFF 100%)',
        'hero-gradient':
          'linear-gradient(340.32deg, rgba(255, 134, 189, 0.2) 10.15%, rgba(255, 98, 170, 0) 29.46%), linear-gradient(313.32deg, rgba(28, 4, 15, 0.7) 10.6%, rgba(28, 4, 15, 0) 24.95%), linear-gradient(302.62deg, rgba(0, 118, 255, 0.2) -0.25%, rgba(0, 118, 255, 0) 39.26%), linear-gradient(325.69deg, rgba(255, 99, 170, 0.126) 37.4%, rgba(255, 0, 117, 0) 65.3%), linear-gradient(330.52deg, rgba(255, 115, 179, 0.4) 8.45%, rgba(255, 0, 117, 0) 38.98%), linear-gradient(322deg, rgba(255, 0, 117, 0.3) 27.98%, rgba(255, 0, 117, 0) 57.68%), linear-gradient(107.58deg, rgba(255, 255, 255, 0.2) -23.27%, rgba(255, 255, 255, 0) 45.22%), linear-gradient(27.6deg, #1C040F 19.4%, #061B33 78.06%, #0F4585 107.66%, #0076FF 119.76%)',
        'gray-radial-gradient':
          'radial-gradient(105.33% 105.33% at 84.2% -5.33%, #0D0D0D 0%, #121212 100%)',
        'gray-radial-gradient-alternative':
          'linear-gradient(180deg, #0E0E0E 12.16%, #1D1D1D 81.05%)'
      },
      screens: {
        '2xl': '1441px',
        '3xl': '1920px'
      }
    }
  },
  plugins: []
}
