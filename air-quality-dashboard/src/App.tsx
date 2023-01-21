import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
