// @ts-ignore
import fs from "fs"
import { getCSSVars } from "./src/utils"

const css = Object.entries(getCSSVars()).map(([token, value]) => {
  return `  ${token}: ${value};`
}).join("\n")

fs.writeFileSync("src/global.css", `:root{
${css}
}`)
