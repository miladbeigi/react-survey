import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AdminButtons() {
  const classes = useStyles();
  const history = useHistory();

  const routeChange = () => {
    history.push('/admin/create');
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={routeChange}
        startIcon={<DeleteIcon />}
      >
        Add Survey
      </Button>
    </div>
  );
}
