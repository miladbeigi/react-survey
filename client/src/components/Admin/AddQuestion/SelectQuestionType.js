import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    marginTop: 10,
    minWidth: 300,
  },
}));

export default function SelectQuestionType(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setType(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth variant="filled" className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          required
          value={props.type ? props.type : "OpenEnded"}
          onChange={(ev) => handleChange(ev)}
          label="Type"
        >
          <MenuItem value={"ClosedAnswer"}>Closed answers</MenuItem>
          <MenuItem value={"OpenEnded"}>Open ended</MenuItem>
        </Select>
      </FormControl>
      {props.type === "OpenEnded" && (
        <FormControl fullWidth variant="filled" className={classes.formControl}>
          <InputLabel>Required or Optional</InputLabel>
          <Select
            required
            value={props.isOptional ? props.isOptional : "Required"}
            onChange={(ev) => props.setIsOptional(ev.target.value)}
            label="Required"
          >
            <MenuItem value={"Required"}>Required</MenuItem>
            <MenuItem value={"Optional"}>Optional</MenuItem>
          </Select>
        </FormControl>
      )}
    </div>
  );
}
