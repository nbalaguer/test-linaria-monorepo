import deepmerge from "deepmerge";
import { mapValues } from "./l";

const primary = {
  "10": "#C6D3F3",
  "20": "#8DA7E6",
  "30": "#547CDA",
  "40": "#3766D3",
  "50": "#2956BE",
  "60": "#2349A2",
  "70": "#1D3C85",
  "80": "#17306A",
  "90": "#112450",
  "100": "#0C1835",
}

const secondary = {
  "10": "#FFFFFF",
  "20": "#F4F5F5",
  "30": "#E5E6E6",
  "40": "#B0B3B5",
  "50": "#5A5F62",
  "60": "#5A5F62",
  "70": "#43484C",
  "80": "#323639",
  "90": "#232729",
  "100": "#131516",
}

export const weight = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
}

export const letterSpacing = {
  narrowest: "-0.04em",
  narrow: "-0.02em",
  normal: "0em",
  wide: "0.02em",
  widest: "0.04em",
}

export const lineHeight = {
  "10": "130%",
  "20": "130%",
  "30": "130%",
  "40": "140%",
  "50": "150%",
  "60": "160%",
  "70": "170%",
  "80": "180%",
  "90": "190%",
  "100": "200%",
}

export const size = {
  "10": "0.5rem", // 8px
  "20": "0.625rem", // 10px
  "30": "0.75rem", // 12px
  "40": "0.875rem", // 14px
  "50": "1rem", // 16px
  "60": "1.125rem", // 18px
  "70": "1.25rem", // 20px
  "80": "1.5rem", // 24px
  "90": "1.75rem", // 28px
  "100": "2rem", // 32px
  "110": "2.25rem", // 36px
  "120": "2.5rem", // 40px
  "130": "3rem", // 48px
  "140": "3.5rem", // 56px
  "150": "4rem", // 64px
  "160": "4.5rem", // 72px
  "170": "5rem", // 80px
  "180": "6rem", // 96px
  "190": "7rem", // 112px
}

export const color = {
  primary,
  secondary,
}

export const font = {
  size,
  weight,
  lineHeight,
  letterSpacing,
}

export type Colors = typeof color
export type Color = typeof primary

export function createTheme(overrides?: any) {
  const tcolor = overrides?.color ? deepmerge(color, overrides.color) : color

  function getCss(co: any) {
    const p = (o: Record<string,string>) => `${Object.entries(o).map(([token, value]) => `${token}: ${value};`).join(" ")}`

    return `${p(co.default)}${co.lg ? ` @media (min-width: 768px) {${p(co.lg)}}` : ""}`
  }

  function getCssVars() {
    const cssVars: Record<string, string> = {}

    for (const [name, palette] of Object.entries(tcolor)) {
      for (const [tone, value] of Object.entries(palette)) {
        cssVars[`--pls-color-${name}-${tone}`] = value
      }
    }
    for (const [name, value] of Object.entries(size)) {
      cssVars[`--pls-text-${name}`] = value
    }
    for (const [name, value] of Object.entries(weight)) {
      cssVars[`--pls-text-${name}`] = value
    }
    for (const [name, value] of Object.entries(letterSpacing)) {
      cssVars[`--pls-text-${name}`] = value
    }
    for (const [name, value] of Object.entries(lineHeight)) {
      cssVars[`--pls-text-height-${name}`] = value
    }

    return cssVars
  }

  const baseTheme = {
    value: {
      color,
      font,
    },
    token: {
      color: mapValues(tcolor, (palette, name) => mapValues(palette, (_, tone) => `--pls-color-${name}-${tone}`)),
      font: mapValues(font, (values, property) => mapValues(values as Record<string, string>, (_, name) => {
        if (property === "lineHeight") {
          return `--pls-text-height-${name}`
        }
        return `--pls-text-${name}`
      })),
    },
    cssvar: {
      color: mapValues(tcolor, (palette, name) => mapValues(palette, (_, tone) => `var(--pls-color-${name}-${tone})`)),
      font: mapValues(font, (values, property) => mapValues(values as Record<string, string>, (_, name) => {
        if (property === "lineHeight") {
          return `var(--pls-text-height-${name})`
        }
        return `var(--pls-text-${name})`
      })),
    },
    getCssVars,
    getCss,
  }

  const typography = {
    title: {
      10: {
        default: {
          "font-weight": baseTheme.cssvar.font.weight.bold,
          "letter-spacing": baseTheme.cssvar.font.letterSpacing.normal,
          "line-height": baseTheme.cssvar.font.lineHeight[20],
          "font-size": baseTheme.cssvar.font.size[100],
        },
        lg: {
          "font-size": baseTheme.cssvar.font.size[130],
        },
      },
      20: {
        default: {
          "font-weight": baseTheme.cssvar.font.weight.bold,
          "letter-spacing": baseTheme.cssvar.font.letterSpacing.normal,
          "line-height": baseTheme.cssvar.font.lineHeight[20],
          "font-size": baseTheme.cssvar.font.size[90],
        },
        lg: {
          "font-size": baseTheme.cssvar.font.size[120],
        },
      },
    },
    body: {
      10: {
        default: {
          "font-weight": baseTheme.cssvar.font.weight.regular,
          "letter-spacing": baseTheme.cssvar.font.letterSpacing.normal,
          "line-height": baseTheme.cssvar.font.lineHeight[50],
          "font-size": baseTheme.cssvar.font.size[40],
        },
        lg: {
          "font-size": baseTheme.cssvar.font.size[50],
        },
      },
      20: {
        default: {
          "font-weight": baseTheme.cssvar.font.weight.regular,
          "letter-spacing": baseTheme.cssvar.font.letterSpacing.normal,
          "line-height": baseTheme.cssvar.font.lineHeight[60],
          "font-size": baseTheme.cssvar.font.size[30],
        },
        lg: {
          "font-size": baseTheme.cssvar.font.size[40],
        },
      },
    }
  }

  return {
    ...baseTheme,
    typography,
  }

}