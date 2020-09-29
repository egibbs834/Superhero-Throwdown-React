import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/Search/Search";
import NoMatch from "./pages/NoMatch";
import Fight from "./pages/Fight/Fight";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/index";

const dotenv = require("dotenv").config();

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path={"/signup"} component={SignUp} />
          <Route exact path={["/search"]} component={SearchPage} />
          <Route exact path="/fight" component={Fight} />
          <Route exact path="*" component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
