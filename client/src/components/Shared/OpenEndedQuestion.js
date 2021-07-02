import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import HelpIcon from "@material-ui/icons/Help";
import Avatar from "@material-ui/core/Avatar";

export default function OpenEndedQuestion(props) {
  const [error, setError] = React.useState(true);
  const { id, type, optional, title, answer } = props;

  const handleChange = (answer) => {
    if (answer === "") {
      setError(true);
    } else {
      setError(false);
    }
    const ansObj = {
      id: id,
      type: type,
      optional: optional,
      title: title,
      answer: answer,
    };
    props.updateTextAnswer(ansObj);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HelpIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={title} secondary={props.optional} />
        </ListItem>
      </Grid>
      <Grid item xs={12}>
        <ListItem button>
          <TextField
            error={props.readonly ? "" : optional === "Required" ? error : false}
            variant="outlined"
            disabled={props.readonly}
            id={id}
            required={props.readonly ? "" : optional === "Required" ? true : false}
            label={props.readonly ? answer : "Type your answer here..."}
            fullWidth
            helperText= { props.readonly ? "" : (error && (optional === "Required")) ? "Your answer is required" : ""}
            onChange={(ev) => handleChange(ev.target.value)}
          />
        </ListItem>
        <Grid item />
      </Grid>
    </Grid>
  );
}
