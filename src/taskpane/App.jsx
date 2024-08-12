import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@fluentui/react-components";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeScreen from "./screens/HomeScreen";
import UsersScreen from "./screens/UsersScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactSearchScreen from "./screens/ContactSearchScreen";
import ChatScreen from "./screens/ChatScreen";
import SicScreen from "./screens/SicScreen";
import GestionFicScreen from "./screens/GestionFiScreen";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
  tabsContainer: {
    overflowX: "auto",
  },
});

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
            <div className={styles.tabsContainer}>
              <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" role="navigation">
                <Tab label="Home" to="/" component={Link} />
                {/* <Tab label="About" to="/about" component={Link} />
                <Tab label="Users" to="/users" component={Link} /> */}
                <Tab label="ANNUAIRE" to="/annuaire" component={Link} />
                <Tab label="SIC" to="/sic" component={Link} />
                <Tab label="CHAT" to="/chat" component={Link} />
                <Tab label="Gestion Fi" to="/fi" component={Link} />
              </Tabs>
            </div>
          </Box>

          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            {/* <Route path="/about">
              <AboutScreen />
            </Route>
            <Route path="/users">
              <UsersScreen />
            </Route> */}
            <Route path="/annuaire">
              <ContactSearchScreen />
            </Route>
            <Route path="/sic">
              <SicScreen />
            </Route>
            <Route path="/chat">
              <ChatScreen />
            </Route>
            <Route path="/fi">
              <GestionFicScreen />
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
