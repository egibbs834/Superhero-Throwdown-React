import React, { useState, useMemo, Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoMatch from "./pages/NoMatch";
import Fight from "./pages/Fight/Fight";
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/index";
import AuthenticationContext from "./context/authenticationContext";
import UsernameContext from "./context/usernameContext";
import HeroContext from "./context/heroContext";
import FightPageHeroContext from "./context/fightPageHeroContext";
import FightPageVillainContext from "./context/fightPageVillainContext";
import Search from "./pages/Search/Search";
import Universe from "./pages/Universe";

const dotenv = require("dotenv").config();

// set up context
// update context to let the app know you've been signed in

function App() {
  const [fightPageHeroContext, setFightPageHeroContext] = useState({});
  const fightPageHeroValue = useMemo(
    () => ({
      fightPageHeroContext,
      setFightPageHeroContext,
    }),
    [fightPageHeroContext, setFightPageHeroContext]
  );

  const [fightPageVillainContext, setFightPageVillainContext] = useState({});
  const fightPageVillainValue = useMemo(
    () => ({
      fightPageVillainContext,
      setFightPageVillainContext,
    }),
    [fightPageVillainContext, setFightPageVillainContext]
  );

  const [heroContext, setHeroContext] = useState({});
  const heroValue = useMemo(
    () => ({
      heroContext,
      setHeroContext,
    }),
    [heroContext, setHeroContext]
  );
  const [username, setUsername] = useState("");
  const usernameValue = useMemo(
    () => ({
      username,
      setUsername,
    }),
    [username, setUsername]
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticatedValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
    }),
    [isAuthenticated, setIsAuthenticated]
  );
  return (
    <Router>
      <AuthenticationContext.Provider value={isAuthenticatedValue}>
        <UsernameContext.Provider value={usernameValue}>
          <HeroContext.Provider value={heroValue}>
            <FightPageVillainContext.Provider value={fightPageVillainValue}>
              <FightPageHeroContext.Provider value={fightPageHeroValue}>
                <Navbar />
                <Switch>
                  {isAuthenticated ? (
                    <Fragment>
                      <Route
                        exact
                        path="/search"
                        render={(props) => <Search {...props} />}
                      />
                      <Route exact path="/universe" component={Universe} />
                      <Route exact path="/fight" component={Fight} />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Route
                        exact
                        path={["/", "/login"]}
                        render={(props) => <Login {...props} />}
                      />
                      <Route
                        exact
                        path="/signup"
                        render={(props) => <SignUp {...props} />}
                      />
                      <Route component={Login} />
                    </Fragment>
                  )}
                  <Route exact path="*" component={NoMatch} />
                </Switch>
              </FightPageHeroContext.Provider>
            </FightPageVillainContext.Provider>
          </HeroContext.Provider>
        </UsernameContext.Provider>
      </AuthenticationContext.Provider>
    </Router>
  );
}

export default App;
