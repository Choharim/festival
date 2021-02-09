import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "pages/Home/index";
import FestivalsPage from "pages/Festivals/index";
import FestivalDetailsPage from "pages/FestivalDetails/index";
import LogInPage from "pages/LogIn/index";
import SignUpPage from "pages/SignUp/index";
import FavoriteFestivalsPage from "pages/FavoriteFestivals/index";
import ChatBotPage from "pages/ChatBot/index";

const App = () => {
  return (
    <div className="App">
      <Router>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/festivals" exact>
            <FestivalsPage />
          </Route>
          <Route path="/festivals/:id" exact>
            <FestivalDetailsPage />
          </Route>
          <Route path="/logIn" exact>
            <LogInPage />
          </Route>
          <Route path="/signUp" exact>
            <SignUpPage />
          </Route>
          <Route path="/favorite" exact>
            <FavoriteFestivalsPage />
          </Route>
          <Route path="/chatBot" exact>
            <ChatBotPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
    font-family: 'Noto Sans KR', sans-serif;
  }

  body {
    box-sizing: border-box;
  }
  a {
    text-decoration:none;
    color:black;
    &:hover {
      color:black;
    }
    &:visited {
      color:black;
    }
  }
`;
