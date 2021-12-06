import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import theme from "../utils/theme";

import Index from "../pages/index";
//import contactUs from "../pages/studeval";

import { ThemeProvider, createTheme } from "@mui/material";

import {useSelector} from "react-redux";
import StudEval from "../pages/studeval";

export default function RouterComponent() {
  const ui= useSelector((state)=>state.ui);
  const THEME = createTheme(theme(ui.isDarkMode));

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Switch>
        <Route path="/" exact>
            <Redirect to="/index"></Redirect>
          </Route>

          <Route component={Index} path="/index" />

          <Route
          component={StudEval}
            path="/studeval"
            exact
          />

        </Switch>
      </Router>
    </ThemeProvider>
  );
}
