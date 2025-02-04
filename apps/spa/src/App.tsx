import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@acme/ui'
import "@acme/tokens/theme.css"
import styled, { createGlobalStyle, css, ThemeProvider } from 'styled-components'
import { createTheme } from '@acme/tokens'

const theme = createTheme({
  color: {
    primary: {
      10: "#DDF3EE",
      20: "#B3E1D7",
      30: "#51BAA5",
      40: "#2CAB92",
      50: "#098E74",
      60: "#088068",
      70: "#076B57",
      80: "#066351",
      90: "#055546",
      100: "#04392E",
    }
  }
})

const GlobalStyles = createGlobalStyle`
  :root {
    ${Object.entries(theme.getCssVars()).map(([token, value]) => css`
      ${token}: ${value};
    `)}
  }
`

const SButton = styled(Button)`
  /* background: red; */
`

const CustomButtonStyled = styled.button`
  background-color: ${({theme}) => theme.cssvar.color.primary[60]};
  ${({theme}) => theme.getCss(theme.typography.body[10])}
`

function CustomButton() {
  return <CustomButtonStyled>Botón custom</CustomButtonStyled>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <SButton
          variant="primary"
          onClick={() => setCount((count) => count + 1)}
          // style={{borderColor: "yellow"}}
        >
          count is {count}
        </SButton>
        <CustomButton />
        <p className="pls-title-20" style={{"color": "--pls-color-primary-60"}}>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ThemeProvider>
  )
}

export default App
