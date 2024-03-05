import React from "react";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import logoImage from "./../../../assets/logo-filled.png";

const Home = () => {
  return <h2>Home</h2>;
};

const About = () => {
  return <h2>About</h2>;
};

const Users = () => {
  return <h2>Users</h2>;
};

const App = (props) => {
  const { title, isOfficeInitialized } = props;
  return (
    <>
      {isOfficeInitialized ? (
        <HashRouter>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </HashRouter>
      ) : (
        <div>
          <p>Loading</p>
        </div>
      )}
    </>
  );
};

// Add PropTypes validation
App.propTypes = {
  title: PropTypes.string.isRequired,
  isOfficeInitialized: PropTypes.bool.isRequired,
};

export default App;
