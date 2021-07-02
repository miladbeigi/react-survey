import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars(props) {
  const classes = useStyles();

  const handleClick = () => {
    props.setSnack((oldSnack) => {
      return { ...oldSnack, open: false };
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setSnack((oldSnack) => {
      return { ...oldSnack, open: false };
    });
  };

  // <Alert severity="error">This is an error message!</Alert>
  // <Alert severity="warning">This is a warning message!</Alert>
  // <Alert severity="info">This is an information message!</Alert>
  // <Alert severity="success">This is a success message!</Alert>

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={props.snack.open}
        onClick={handleClick}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={props.snack.type}>
          {props.snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
