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

// set up context
// update context to let the app know you've been signed in

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/signup" render={(props) => <SignUp {...props} />} />
        <Route exact path={"/search"} component={SearchPage} />
        <Route exact path="/fight" component={Fight} />
        <Route exact path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
