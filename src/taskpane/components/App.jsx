import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@fluentui/react-components";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const Home = () => {
  return <h2>Home</h2>;
};

const About = () => {
  return <h2>About</h2>;
};

const Users = () => {
  return <h2>Users</h2>;
};

const App = () => {
  const [value, setValue] = React.useState(0);
  const styles = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <HashRouter>
        <div>
          <Box sx={{ width: "100%" }}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" role="navigation">
              <Tab label="Home" to="/" component={Link} />
              <Tab label="About" to="/about" component={Link} />
              <Tab label="Users" to="/users" component={Link} />
            </Tabs>
          </Box>

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
    </div>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

export default App;
