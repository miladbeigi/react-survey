import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export default function QestionRow(props) {
  const handledelete = (questionId) => {
    props.deleteQuestion(questionId);
  };

  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar>
          <HelpIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.title} secondary={props.type} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="up"
          disabled={props.position === 0 ? true : false}
          color="primary"
          onClick={props.onUp}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="down"
          disabled={props.position === props.length-1 ? true : false}
          color="primary"
          onClick={props.onDown}
        >
          <ArrowDownwardIcon />
        </IconButton>
        <IconButton
          id="milad"
          onClick={() => handledelete(props.id)}
          edge="end"
          aria-label="delete"
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
