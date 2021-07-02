import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
}));

export default function Stepper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        onClick={props.handleBack}
        disabled={props.activeResponse === 0 ? true : false}
        className={classes.backButton}
        variant="contained"
        color="primary"
      >
        Back
      </Button>
      <Button
        disabled={
          props.activeResponse === props.responseLength - 1 ? true : false
        }
        onClick={props.handleNext}
        variant="contained"
        color="primary"
      >
        Next
      </Button>
    </div>
  );
}
