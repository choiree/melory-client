import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  }

  *, *::before, *::after {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    /* line-height: 1.5;
    overflow-x: hidden;
    overflow-y: hidden; */
  }

  h2, p {
    margin: 0;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  a {
    color: black;
    text-decoration: none;
  }
`;

export default GlobalStyle;
