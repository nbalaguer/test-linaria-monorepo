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
} as const

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
} as const;

export const color = {
  primary,
  secondary,
}

export const colortoken = mapValues(color, (palette, name) => mapValues(palette, (_, tone) => `--pls-color-${name}-${tone}`))
export const colorvar = mapValues(color, (palette, name) => mapValues(palette, (_, tone) => `var(--pls-color-${name}-${tone})`))

export const palette = {
  background: {
    10: colorvar.primary[50]
  }
}