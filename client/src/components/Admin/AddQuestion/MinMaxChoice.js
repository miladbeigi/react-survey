import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 500
  }
});

function valuetext(value) {
  return `${value}°C`;
}

export default function MinMaxChoice(props) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Choose minimum and maximum number of answers
      </Typography>
      <Slider
        value={props.value}
        marks={true}
        max={10}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
