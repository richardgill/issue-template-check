import chroma from 'chroma-js'
export type SemanticTokenColor = keyof typeof semanticTokens['colors']

// This sets the mood of the theme. A blue color will result in a blue theme...etc
const SEED_COLOR: chroma.Color = chroma(`#3182CE`)
// const SEED_COLOR: chroma.Color = chroma.random().set(`hsl.s`, 0.6);

// Moves from light to dark against a curve
const LIGHTNESS_CURVE = [
  0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.12, 0.08
]
// Optional lightness curve for darker blacks
const GRAY_LIGHTNESS_CURVE = [
  0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.16, 0.08, 0.02
]

// Moves from slightly desaturated to saturated to desaturated
const SATURATION_CURVE = [0.12, 0.1, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.1, 0.12]

// A higher number will result in less saturated colors
const DESATURATE_GRAY_LEVEL = 2.4

/**
 * Function to shift the hue of any passed chroma value
 *
 * @param color The chroma color to shift from
 * @param amount The amount (out of 360) to shift the hue by
 * @returns Returns a chroma color with the hue shifted by the amount
 */
// eslint-disable-next-line
// const shiftHue = (color: chroma.Color, amount: number) => {
//   const colorHue = chroma(SEED_COLOR).get(`hsl.h`)
//   if (colorHue + amount > 360) {
//     return chroma(color).set(`hsl.h`, colorHue + amount - 360)
//   }
//   return chroma(color).set(`hsl.h`, colorHue + amount)
// }

// const primary = shiftHue(SEED_COLOR, 120);
const accent = chroma('#06D6A0')
// const primary = shiftHue(SEED_COLOR, 123);
// const accent = shiftHue(SEED_COLOR, 240);
const primary = chroma('#3182CE')
const teal = chroma(SEED_COLOR.set(`hsl.h`, 180))
const red = chroma(SEED_COLOR.set(`hsl.h`, 360))
const orange = chroma(SEED_COLOR.set(`hsl.h`, 20))
const yellow = chroma(SEED_COLOR.set(`hsl.h`, 50))
const green = chroma(SEED_COLOR.set(`hsl.h`, 144))
const purple = chroma(SEED_COLOR.set(`hsl.h`, 280))
const blue = chroma(SEED_COLOR.set(`hsl.h`, 196))
const pink = chroma(SEED_COLOR.set(`hsl.h`, 332))

/**
 * Will adjust a foreground color until it passes WCAG AA contrast ratio (4.5)
 *
 * @param foreground The foreground color to make readable
 * @param background The background color to make readable against
 * @returns Returns an adjusted foreground color as a hex that will have a 4.5 contract rating against the provided background.
 */
const makeReadable = (foreground: chroma.Color, background: chroma.Color) => {
  const contrastRatio = chroma.contrast(foreground, background)
  if (contrastRatio > 4.5) {
    return foreground.hex()
  } else {
    let newForeground = foreground
    let newContrastRatio = chroma.contrast(newForeground, background)
    while (newContrastRatio < 4.5) {
      if (background.luminance() > 0.5) {
        newForeground = chroma(newForeground).darken(0.05)
      } else {
        newForeground = chroma(newForeground).brighten(0.05)
      }
      newContrastRatio = chroma.contrast(newForeground, background)
    }
    return newForeground.hex()
  }
}

type ColorSet = {
  [index: string]: string
}

/**
 * Color function to make some readable text based upon the background color
 *
 * @param color The foreground color to make readable
 * @param mode The theme you are targeting (light or dark)
 * @returns Returns an adjusted foreground color as a hex that will have a 4.5 contract rating against the provided background.
 */
const quickReadableText = (color: chroma.Color, mode: `light` | `dark`) => {
  return makeReadable(
    color,
    chroma(mode === `dark` ? colors.gray[`700`] : colors.gray[`50`])
  )
}

// Given a color and some shift values, will return a theme pallette of 10 colors
const generateColorSet = (
  color: chroma.Color,
  desaturate?: number,
  curve?: number[]
) => {
  const lightnessCurve = curve || LIGHTNESS_CURVE
  const desaturatedColor = chroma(color).desaturate(desaturate || 0)
  const lightnessGoal = desaturatedColor.get(`hsl.l`)
  const closestLightness = lightnessCurve.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal)
      ? curr
      : prev
  )
  const baseColorIndex = lightnessCurve.findIndex((l) => l === closestLightness)

  const colors = lightnessCurve
    .map((l) => desaturatedColor.set(`hsl.l`, l))
    .map((color) => chroma(color))
    .map((color, i) => {
      const saturationDelta =
        SATURATION_CURVE[i] - SATURATION_CURVE[baseColorIndex]
      // If there is no hue, there is no need to saturate
      // In Chroma, black and white get NaN for hue
      if (isNaN(color.get('hsl.h'))) {
        return color.set('hsl.h', 0).hex()
      }
      // Otherwise, saturate according to the curve
      return saturationDelta >= 0
        ? color.saturate(saturationDelta).hex()
        : color.desaturate(saturationDelta * -1).hex()
    })
  const nameScale = [
    `50`,
    `100`,
    `200`,
    `300`,
    `400`,
    `500`,
    `600`,
    `700`,
    `800`,
    `900`
  ]
  // TODO: Figure a better way to assign this type
  const colorObject: ColorSet = nameScale.reduce((a, v, index) => {
    const colorInPalette = colors[index]
    return { ...a, [v]: colorInPalette }
  }, {})
  return colorObject
}

export const colors = {
  SEED_COLOR: SEED_COLOR.hex(),
  gray: generateColorSet(
    SEED_COLOR,
    DESATURATE_GRAY_LEVEL,
    GRAY_LIGHTNESS_CURVE
  ),
  primary: generateColorSet(primary),
  accent: generateColorSet(accent),
  teal: generateColorSet(teal),
  red: generateColorSet(red),
  orange: generateColorSet(orange),
  yellow: generateColorSet(yellow),
  green: generateColorSet(green),
  purple: generateColorSet(purple),
  blue: generateColorSet(blue),
  pink: generateColorSet(pink)
}

// Contrast scale is what we use to define our tint/shade scale
// A separate object is needed so we can reference it within the semanticTokens
const contrastScale = {
  empty: { light: 'white', dark: 'gray.800' },
  lowest: {
    light: 'gray.50',
    dark: chroma(colors.gray['800']).brighten(0.2).hex()
  },
  low: {
    light: chroma(colors.gray['100']).brighten(0.15).hex(),
    dark: chroma(colors.gray['800']).brighten(0.4).hex()
  },
  medium: { light: 'gray.300', dark: 'gray.500' },
  high: { light: 'gray.600', dark: 'gray.300' },
  highest: { light: 'gray.800', dark: 'gray.200' },
  full: { light: 'gray.800', dark: 'gray.100' }
}

export const semanticTokens = {
  colors: {
    seed: { _light: SEED_COLOR.hex(), _dark: SEED_COLOR.hex() },
    ghost: { _light: `white`, _dark: `white` },
    ink: { _light: `gray.900`, _dark: `gray.900` },
    contrastEmpty: {
      _light: contrastScale.empty.light,
      _dark: contrastScale.empty.dark
    },
    contrastLowest: {
      _light: contrastScale.lowest.light,
      _dark: contrastScale.lowest.dark
    },
    contrastLow: {
      _light: contrastScale.low.light,
      _dark: contrastScale.low.dark
    },
    contrastMedium: {
      _light: contrastScale.medium.light,
      _dark: contrastScale.medium.dark
    },
    contrastHigh: {
      _light: contrastScale.high.light,
      _dark: contrastScale.high.dark
    },
    contrastHighest: {
      _light: contrastScale.highest.light,
      _dark: contrastScale.highest.dark
    },
    contrastFull: {
      _light: contrastScale.full.light,
      _dark: contrastScale.full.dark
    },
    primary: { _light: `primary.500`, _dark: `primary.300` },
    success: { _light: `green.500`, _dark: `green.300` },
    danger: { _light: `red.500`, _dark: `red.300` },
    info: { _light: `blue.500`, _dark: `blue.300` },
    text: { _light: 'gray.800', _dark: 'gray.50' },
    textSubtle: {
      _light: quickReadableText(chroma(colors.gray[600]), `light`),
      _dark: quickReadableText(chroma(colors.gray[400]), `dark`)
    },
    title: { _light: `gray.900`, _dark: `white` },
    textInvert: { _light: 'white', _dark: 'gray.800' },
    textPrimary: {
      _light: quickReadableText(chroma(colors.primary[400]), `light`),
      _dark: quickReadableText(chroma(colors.primary[500]), `dark`)
    },
    textAccent: {
      _light: quickReadableText(chroma(colors.accent[400]), `light`),
      _dark: quickReadableText(chroma(colors.accent[500]), `dark`)
    },
    textWarning: {
      _light: quickReadableText(chroma(colors.orange[400]), `light`),
      _dark: quickReadableText(chroma(colors.orange[500]), `dark`)
    },
    textSuccess: {
      _light: quickReadableText(chroma(colors.green[400]), `light`),
      _dark: quickReadableText(chroma(colors.green[500]), `dark`)
    },
    textDanger: {
      _light: quickReadableText(chroma(colors.red[400]), `light`),
      _dark: quickReadableText(chroma(colors.red[500]), `dark`)
    },
    textInfo: {
      _light: quickReadableText(chroma(colors.blue[400]), `light`),
      _dark: quickReadableText(chroma(colors.blue[500]), `dark`)
    },
    bg: { _light: 'white', _dark: 'gray.800' },
    bgDanger: {
      _light: chroma(colors.red[50]).hex(),
      _dark: chroma(colors.red[200]).alpha(0.15).hex()
    },
    bgWarning: {
      _light: 'yellow.50',
      _dark: chroma(colors.yellow[300]).alpha(0.15).hex()
    },
    bgSuccess: {
      _light: 'green.50',
      _dark: chroma(colors.green[300]).alpha(0.15).hex()
    },
    bgInfo: {
      _light: 'blue.50',
      _dark: chroma(colors.primary[300]).alpha(0.1).hex()
    },
    bgInvert: { _light: 'gray.800', _dark: 'white' },
    bgHighlight: {
      _light: contrastScale.lowest.light,
      _dark: contrastScale.lowest.dark
    },
    stroke: {
      _light: contrastScale.low.light,
      _dark: chroma(contrastScale.lowest.dark).brighten(0.3).hex()
    },
    dialogBg: { _light: 'white', _dark: contrastScale.lowest.dark },
    dialogBorder: {
      _light: contrastScale.low.light,
      _dark: chroma(contrastScale.lowest.dark).brighten(0.3).hex()
    },
    // Tokens acording to the Figma designs that can be found here https://www.figma.com/file/RQlFwhHSMdbdVMZC4WtmKa/UI-Library?node-id=73%3A3025
    inputBg: {
      _light: 'white',
      _dark: chroma(colors.gray[900]).brighten(0.1).hex()
    },
    inputBorder: { _light: 'gray.200', _dark: 'gray.700' },
    codeBg: {
      _light: contrastScale.lowest.light,
      _dark: chroma(colors.gray[900]).brighten(0.1).hex()
    },
    headerBg: { _light: 'contrastEmpty', _dark: 'contrastEmpty' },
    // PLANNED FOR DEPRECATION
    // These values are not used in templates other than the header. They are hard coded and do not adapt to the theme.
    // They will be removed following a revamp of the utils/themeColors.ts
    xataGray: {
      default: '#2D3748',
      _dark: '#CBD5E0'
    },
    xataGreen: {
      default: '#38A169',
      _dark: '#25855A'
    },
    xataOrange: {
      default: '#C05621',
      _dark: '#C05621'
    },
    xataPink: {
      default: '#97266D',
      _dark: '#ED64A6'
    },
    xataPurple: {
      default: '#6B46C1',
      _dark: '#9F7AEA'
    },
    xataCyan: {
      default: '#0987A0',
      _dark: '#0BC5EA'
    },
    xataBlue: {
      default: '#2480C2',
      _dark: '#63B3ED'
    }
  }
}

// breakpoints
export const breakpoints = {
  xs: '23em', // 375px
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
  '3xl': '120em' // 1920px
}

export const fonts = {
  heading:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
}

// Occassionally we need to get the raw hex value of a token. Charkra's useToken hook will
// return the css var(), but not the raw value.
export const getComputedTokenValues = (variables: string[]) => {
  const style = getComputedStyle(document.documentElement)
  const computedValues: string[] = []
  variables.map((item) => {
    const cssValue = style.getPropertyValue(item)
    computedValues.push(cssValue)
  })
  return computedValues
}
