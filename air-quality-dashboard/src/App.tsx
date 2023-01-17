import React, { Component } from 'react';
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import { onSilentRefresh } from './JWT/auth';

class App extends Component {
  componentDidMount() {
    onSilentRefresh();
  }
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
