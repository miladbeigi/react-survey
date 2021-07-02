import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Header from "./Header";
import Content from "./Content";
import Admin from "../components/Admin/Home/Admin";
import API from "../API/UserAPI";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Snackbars from "../components/Shared/Snackbars";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        setUser(user);
        setLoggedIn(true);
      } catch (err) {
      }
    };
    checkAuth();
  }, [loggedIn]);

  const doLogIn = async (credentials, history) => {
    try {
      const user = await API.logIn(credentials);
      setUser(user);
      setLoggedIn(true);
      history.push("/admin/home");
    } catch (err) {
      setSnack({
        open: true,
        message: "Invalid username or password",
        type: "error",
      });
    }
  };

  return (
    <Router>
      <Grid container direction="column">
        <Grid item>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </Grid>
        <Switch>
          <Grid item container style={{ marginTop: 20 }} >
            <Grid item xs={false} sm={1} />
            <Grid item xs={110} sm={10}>
              <Route path="/" exact render={() => <Content  loggedIn={loggedIn}/> } />
              <Route
                  path="/login"
                  strict
                  render={() => <Login doLogIn={doLogIn} />}
              />
              {loggedIn &&<Route path="/admin" render={() => <Admin doLogIn={doLogIn} user={user} loggedIn={loggedIn}/> } />}
            </Grid>
            <Snackbars setSnack={setSnack} snack={snack} />
            <Grid item xs={false} sm={1} />
          </Grid>
        </Switch>
      </Grid>
    </Router>
  );
}

export default App;
