import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

export default function AddChoiceRow(props) {
  const [text, setText] = useState("");
  const [isConfirmed, setisConfirmed] = useState(false);

  const handleAdd = () => {
    if(isConfirmed===true){
      props.addChoice();
    } else {
      props.setSnack({
        open: true,
        message: "Please confirm the answer first",
        type: "error",
      });
    }
  };

  const handleUpdate = (choiceId) => {
    if (text !== "") {
      setisConfirmed(true);
      const choiceObj = {
        id: choiceId,
        text: text,
        selected: false,
      };
      props.addChoice(choiceObj);
    } else {
      props.setSnack({
        open: true,
        message: "Please add a text for the answer",
        type: "error",
      });
    }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <IconButton  onClick={() => handleAdd()}>
            <AddCircleIcon  color="primary" />
          </IconButton>
        </Avatar>
      </ListItemAvatar>
      <ListItemAvatar>
        <Avatar>
          <IconButton
            onClick={() => handleUpdate(props.choice.id)}
            aria-label="confirm"
            color="primary"
          >
            <CheckCircleOutlineIcon />
          </IconButton>
        </Avatar>
      </ListItemAvatar>
      <ListItem>
        <TextField
          error={text==="" ? true : false}
          variant="outlined"
          disabled={isConfirmed}
          onChange={(ev) => {
            setText(ev.target.value);
          }}
          autoFocus
          margin="dense"
          label="Answer text..."
          type="text"
          fullWidth
        />
      </ListItem>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          onClick={() => props.delChoice(props.choice.id)}
          aria-label="delete"
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
