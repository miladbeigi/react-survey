import React from "react";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import AddChoiceRow from "./AddChoiceRow";

export default function AddChoiceForm(props) {
  const delChoice = (choiceId) => {
    if (props.choices.length === 1) {
      props.setSnack({
        open: true,
        message: "Question should contain at least one choice",
        type: "error",
      });
    } else {
      props.setChoices((oldChoices) =>
        oldChoices.filter((ch) => ch.id != choiceId)
      );
    }
  };

  const addChoice = (choiceObj) => {
    const newId = Math.max(...props.choices.map((ch) => ch.id)) + 1;
    if (choiceObj === undefined) {
      props.setChoices((oldChoices) => [
        ...oldChoices,
        { id: newId, text: "", selected: false },
      ]);
    } else {
      props.setChoices((oldChoices) => {
        return oldChoices.map((ch) => {
          if (ch.id === choiceObj.id) return choiceObj;
          else return ch;
        });
      });
    }
  };

  return (
    <Grid container direction="column" spacing={0}>
      <Grid item xs={12}>
        <List dense disablePadding>
          {props.choices.map((ch) => (
            <AddChoiceRow
              key={ch.id}
              setSnack={props.setSnack}
              snack={props.snack}
              choice={ch}
              addChoice={addChoice}
              delChoice={delChoice}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
