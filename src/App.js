import React from "react";
import { createGlobalStyle } from "styled-components";
import HomePage from "pages/Home/index";

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <HomePage />
    </div>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    box-sizing: border-box;
  }
`;
