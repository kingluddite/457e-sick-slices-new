import { createGlobalStyle } from 'styled-components';
import bg from '../assets/images/bg.svg';
import stripes from '../assets/images/stripes.svg';

const GlobalStyles = createGlobalStyle`
  :root {
    --red: #ff4949;
    --black: #2e2e2e;
    --yellow: #ffc600;
    --white: #ffffff;
    --grey: #efefef;
  }

  html {
    background-image: url(${bg});
    background-attachment: fixed;
    background-size: 450px;
    font-size: 10px;

    /* scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--red) var(--white);
  }

  body {
    font-size: 2rem;
  }

  fieldset {
    border-width: 1px;
    border-color: rgba(0,0,0,0.1);
  }

  button {
    --cast: 2px;
    padding: 0.6rem 1rem;
    border: 0;
    border-radius: 2px;
    background: var(--red);
    color: var(--white);
    box-shadow: var(--cast) var(--cast) 0 var(--grey);
    text-shadow: 0.5px 0.5px 0 rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      --cast: 4px;
    }
  }

  /* .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    } */

  /* Scrollbar Styles */

  body::-webkit-scrollbar {
    width: 12px;
  }
  
  /* this rule is inside the html element and added here to group all scrollbar styles together */
  /* html { 
    scrollbar-width: thin;
    scrollbar-color: var(--red) var(--white);
  } */

  body::-webkit-scrollbar-track {
    background: var(--white);
  }

  body::-webkit-scrollbar-thumb {
    border: 3px solid var(--white);
    border-radius: 7px;
    background-color: var(--red) ;
  }

  hr {
    height: 8px;
    border: 0;
    background-image: url(${stripes});
    background-size: 1500px;
  }

  img {
    max-width: 100%;
  }

  .tilt {
    position: relative;
    display: inline-block;
    transform: rotate(-2deg);
  }

`;

export default GlobalStyles;
