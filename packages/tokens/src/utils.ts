import { color } from "./palette"

export function getCSSVars(overrides?: {color?: Record<string, string>}) {
  const cssVars: Record<string, string> = {}

  const finalColor = {
    ...color,
    ...overrides?.color,
  }

  for (const [name, palette] of Object.entries(finalColor)) {
    for (const [tone, value] of Object.entries(palette)) {
      cssVars[`--pls-color-${name}-${tone}`] = value
    }
  }

  return cssVars
}