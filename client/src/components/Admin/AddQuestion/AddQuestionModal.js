import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SelectQuestionType from "./SelectQuestionType";
import AddChoiceForm from "./AddChoiceForm";
import Snackbars from "../../Shared/Snackbars";
import MinMaxChoice from "./MinMaxChoice";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formRange: {
    margin: theme.spacing(0),
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 10,
    minWidth: 300,
  },
}));

export default function AddQuestionModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("OpenEnded");
  const [choices, setChoices] = React.useState([
    { id: 0, text: "", selected: false },
  ]);
  const [isOptional, setIsOptional] = React.useState("Required");
  const [value, setValue] = React.useState([0, 10]);
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const validatioinCheck = () => {
    let validCheckboxChoices = choices.every((ch) => ch.text !== "");
    if (validCheckboxChoices) return true;
    else return false;
  };

  const handleClose = () => {
    setOpen(false);
    setChoices([{ id: 0, text: "", selected: false }]);
    setIsOptional("Required");
    setTitle("");
    setType("OpenEnded");
    setValue([0, 10]);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (title === "") {
      setSnack({
        open: true,
        message: "Please add question title",
        type: "error",
      });
    } else if ((type === "ClosedAnswer") && (choices.length <= 1 || choices.length < value[0] + 1)) {
      setSnack({
        open: true,
        message: "Please add enough answers according to minimum value",
        type: "error",
      });
    } else if ((type === "ClosedAnswer") && !validatioinCheck()) {
      setSnack({
        open: true,
        message: "Please complete the text for answers and confirm them",
        type: "error",
      });
    } else if (type === "OpenEnded") {
      props.addQuestion({
        type: "OpenEnded",
        optional: isOptional,
        answer: "",
        title: title,
      });
      setSnack({
        open: true,
        message: "Success",
        type: "success",
      });
      handleClose();
    } else if (type === "ClosedAnswer") {
      props.addQuestion({
        type: "ClosedAnswer",
        multipleChoice: value,
        title: title,
        choices: choices,
      });
      setSnack({
        open: true,
        message: "Success",
        type: "success",
      });
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Questions
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            onChange={(ev) => {
              setTitle(() => ev.target.value);
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Question Title"
            type="email"
            fullWidth
          />
          <SelectQuestionType
            setType={setType}
            type={type}
            isOptional={isOptional}
            setIsOptional={setIsOptional}
          />
          {type === "ClosedAnswer" && (
            <FormControl
              fullWidth
              variant="filled"
              className={classes.formRange}
            >
              <MinMaxChoice value={value} setValue={setValue} />
              <AddChoiceForm
                choices={choices}
                setChoices={setChoices}
                setSnack={setSnack}
              />
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => handleAdd(event)}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbars setSnack={setSnack} snack={snack} />
    </div>
  );
}
