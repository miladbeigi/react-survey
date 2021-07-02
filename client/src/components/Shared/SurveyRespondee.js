import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";

export default function SurveyRespondee(props) {
  const [error, setError] = React.useState(true);
  const checkname = (name) => {
    props.updateRespondeeName(name);
    if (name === "") {
      setError(true);
    } else {
      setError(false);
    }
  };
  const { id } = props;

  return (
    <List>
      <Grid container>
        <Grid item xs={12}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon color="secondary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={props.readonly ? "Name: " : "Please enter your name:"}
            />
          </ListItem>
        </Grid>
        <Grid item xs={12}>
          <ListItem button>
            <TextField
              variant="outlined"
              error={error}
              id={id}
              disabled={props.readonly}
              helperText= { props.readonly ? "" : error ? "Your name is required" : ""}
              required={props.respondee === undefined ? true : false}
              label={
                props.respondee === undefined
                  ? "Type your name here..."
                  : props.respondee
              }
              fullWidth
              onChange={(ev) => checkname(ev.target.value)}
            />
          </ListItem>
          <Grid item />
        </Grid>
      </Grid>
    </List>
  );
}
