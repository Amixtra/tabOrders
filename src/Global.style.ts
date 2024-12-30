import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }
  li{
    list-style: none;
  }
  body{
    font-family: "Noto Sans KR", sans-serif;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  button{
    border:none;
    outline:none;
  }
`;

export default GlobalStyle;
