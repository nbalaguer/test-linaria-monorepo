// @ts-ignore
import fs from "fs"
import { createTheme } from "./src/theme"

const theme = createTheme()

const cssVars = Object.entries(theme.getCssVars()).map(([token, value]) => {
  return `  ${token}: ${value};`
}).join("\n")

const cssClasses = Object.entries(theme.typography).flatMap(([name, sizes]) => {
  return Object.entries(sizes).map(([size, styles]) => {
    return `
  .pls-${name}-${size} {
    ${Object.entries(styles.default).map(([cssProp, value]) => {
      return `    ${cssProp}: ${value};`
    }).join("\n")}
  }

  @media (min-width: 768px) {
    .pls-${name}-${size} {
      ${Object.entries(styles.lg).map(([cssProp, value]) => {
        return `    ${cssProp}: ${value};`
      }).join("\n")}
    }
  }
`
  })
}).join("\n")


fs.writeFileSync("src/global.css", `:root{
${cssVars}
${cssClasses}
}`)
