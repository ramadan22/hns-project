import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  .input-range {
    width: 93.5%;
    margin: auto;
  }
  .input-range__label-container {
      display: none;
  }
  .input-range__track--active, .input-range__slider {
    background: #efff00;
    border: 1px solid #efff00;
  }
  .react-datepicker-wrapper {
    width: 100%;
  }
  body {
    overflow: ${props => (props.overflow ? props.overflow : "auto")};
    padding-right: ${props => (props.paddingRight ? props.paddingRight : "0px")};
  }
  .navbar {
    padding-right: ${props => (props.paddingRight ? props.paddingRight : "0px")};
  }
`

export default GlobalStyle