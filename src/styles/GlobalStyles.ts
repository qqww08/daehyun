import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
    ${reset};    
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }
    input, button {
      padding: 0;
      background: none;
      border: none;
      outline: none;
   }

    button {
      margin: 0;
      border: none;
      cursor: pointer;
    }
`;

export default GlobalStyles;
