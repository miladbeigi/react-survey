import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Snackbars from "../components/Shared/Snackbars";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  const classes = useStyles();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    let valid = true;
    const credentials = {
      username: email,
      password: password,
    };
    if (email === "" || password === "" || password.length < 6) valid = false;
    if (email.indexOf("@") === -1) valid = false;
    if (valid) {
      props.doLogIn(credentials, history);
    } else {
      setSnack({
        open: true,
        message: "Invalid username or password",
        type: "error",
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(ev) => setEmail(ev.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={(ev) => setPassword(ev.target.value)}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            onClick={(ev) => {
              handleLogin(ev);
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <Snackbars setSnack={setSnack} snack={snack} />
      </div>
    </Container>
  );
}
