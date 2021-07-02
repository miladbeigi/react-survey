import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import CheckboxLable from "./Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import HelpIcon from "@material-ui/icons/Help";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "",
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

function CheckboxQuestion(props) {
  //const { id, type, title, multipleChoice, choices } = props;
  const [choiceSelected, setChoiceSelected] = useState(props.choices);
  const [otherSelected, setOtherSelected] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    if (!props.readonly) {
      const ansObj = {
        id: props.id,
        type: props.type,
        multipleChoice: props.multipleChoice,
        title: props.title,
        choices: choiceSelected,
      };
      props.updateChoiceAnswer(ansObj);
    }
  }, [choiceSelected]);

  const updateChoice = (value, choiceId) => {
    if (value && otherSelected <= props.multipleChoice[1]) {
      setOtherSelected((s) => s + 1);
    } else if (!value) {
      setOtherSelected((s) => s - 1);
    }

    setChoiceSelected((oldChoices) => {
      return oldChoices.map((ch) => {
        if (ch.id  == choiceId) return { ...ch, selected: value };
        else return ch;
      });
    });
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
          <ListItemText
            primary={props.title}
            secondary={
              (props.multipleChoice[0] > 0 ? "Required, " : "Optional, ") +
              "Min: " +
              props.multipleChoice[0] +
              " Max: " +
              props.multipleChoice[1]
            }
          />
        </ListItem>
      </Grid>
      <Grid item xs={12}>
        <ListItem button>
          <FormControl
            disabled={props.readonly}
            component="fieldset"
            className={classes.formControl}
          >
            <FormGroup row>
              {choiceSelected.map((element) => (
                <CheckboxLable
                  readonly={props.readonly}
                  key={element.id}
                  otherSelected={otherSelected}
                  multipleChoice={props.multipleChoice}
                  updateChoice={updateChoice}
                  {...element}
                />
              ))}
            </FormGroup>
            <Typography variant="caption" color="secondary">
              {props.readonly ? "" : props.multipleChoice[0] > 0 ? props.message : ""}
            </Typography>
          </FormControl>
        </ListItem>
      </Grid>
    </Grid>
  );
}

export default CheckboxQuestion;
