import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }

  #root {
    background-color: ${({ theme }) => theme.colors.backgrounds.body};
    padding: ${({ theme }) => theme.gridUnit * 4}px;
    height: 100vh;
    display: flex;
    color: ${({ theme }) => theme.colors.fonts.main};
    font-family: sans-serif;
  }
`

export default GlobalStyles
