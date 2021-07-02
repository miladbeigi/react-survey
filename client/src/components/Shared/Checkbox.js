import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function CheckboxLable(props) {
  const handleChange = (event) => {
    props.updateChoice(event.target.checked, event.target.id);
  };

  return (
    <FormControlLabel
    control={
      <Checkbox
      disabled={
        props.readonly
        ? true
        : props.selected
        ? false
        : props.otherSelected === props.multipleChoice[1]
        ? true
        : false
      }
      id={props.id}
      checked={props.selected}
      onChange={(ev) => handleChange(ev)}
      name={props.text}
      color="primary"
      />
    }
    label={props.text}
    />
  );
}
