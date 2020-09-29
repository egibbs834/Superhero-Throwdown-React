import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/Search/Search";
import NoMatch from "./pages/NoMatch"
import Fight from "./pages/Fight/Fight"

const dotenv = require("dotenv").config();

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path ={["/", "/superhero-team-react"]} component={SearchPage} />
          <Route exact path="/fight" component={Fight} />
          <Route exact path="*" component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
