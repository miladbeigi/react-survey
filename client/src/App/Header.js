import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AcUnitRoundedIcon from "@material-ui/icons/AcUnitRounded";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import API from "../API/UserAPI";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    padding: 5,
  },
}));

const Header = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const handlelogout = async () => {
    await API.logOut();
    props.setLoggedIn(false);
    history.push("/");
  };

  const gohome = () => {
    if (props.loggedIn)
      history.push("/admin/home");
    else history.push("/");
  }

  const handlelogin = () => {
    history.push("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color={"secondary"} onClick={()=>gohome()}>
          <AcUnitRoundedIcon fontSize="large" />
        </Button>
        <Typography variant="h5" className={classes.typographyStyles}>
          Simple Survey Builder
        </Typography>
        {props.loggedIn ? (
          <Button variant="contained" onClick={handlelogout}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" onClick={handlelogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
