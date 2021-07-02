import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import SurveyTitle from "./SurveyTitle";
import Questions from "./Questions";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SurveyRespondee from "./SurveyRespondee";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import API from "../../API/UserAPI";
import Snackbars from "./Snackbars";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SurveyModalCard(props) {
  const history = useHistory();
  const [answers, setAnswers] = useState(props.questions);
  const [respondeName, setRepondeeName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const [message, setMessage] = useState("");
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  const updateRespondeeName = (name) => {
    if (name !== "") {
      setValid(true);
      setRepondeeName(name);
    } else {
      setValid(false);
    }
  };

  const classes = useStyles();

  const handleClickOpen = () => {
    setValid(false);
    setOpen(true);
  };

  const handleClose = () => {
    setAnswers(props.questions);
    setRepondeeName("");
    setOpen(false);
  };

  const handleOpenResult = () => {
    history.push("/admin/results/" + props.id);
  };

  const validatioinCheck = () => {
    let validTextAnswers = answers
      .filter((ans) => ans.type === "OpenEnded" && ans.optional === "Required")
      .every((ans) => ans.answer !== "");

    let validCheckboxAnswers = answers
      .filter((ans) => ans.type === "ClosedAnswer").filter((ans)=>ans.multipleChoice[0] > 0)
      .every((ansCh) => {
        return (
          ansCh.choices.filter((ch) => ch.selected === true).length+1 >
          ansCh.multipleChoice[0]
        );
      });
    if(!validCheckboxAnswers) {
      setMessage("Required, Please select based on minimum answers");
    } else {
      setMessage("");
    }
    if (validCheckboxAnswers && validTextAnswers) {
      return true;
    }
    else return false;
  };

  const handleSave = () => {
    if (valid && validatioinCheck()) {
      const surveyResponse = {
        id: props.id,
        date: dayjs().format("YYYY-MM-DD"),
        title: props.title,
        description: props.description,
        respondee: respondeName,
        questions: answers,
      };
      API.addResponse(surveyResponse)
        .then(() => {
          setSnack({
            open: true,
            message: "Success",
            type: "success",
          });
          handleClose();
        })
        .catch((error) => {
          setSnack({
            open: true,
            message: "Server Error",
            type: "error",
          });
        });
    } else {
      setSnack({
        open: true,
        message: "Please fix the errors in the form",
        type: "error",
      });
    }
  };

  return (
    <Grid>
      <Card>
        <CardHeader
          title={props.title}
          subheader={props.date}
          action={
            props.loggedIn && (
              <IconButton aria-label="settings">
                <Typography variant="h6"> {props.count}</Typography>
              </IconButton>
            )
          }
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          {props.loggedIn ? (
            <Button
              variant="outlined"
              disabled={props.count === 0 ? true : false}
              color="secondary"
              onClick={handleOpenResult}
            >
              Show Results
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Take
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <SurveyTitle title={props.title} />
            <Button
              autoFocus
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="column"
          style={{ marginTop: "20px" }}
          alignItems="center"
        >
          <Grid item xs={12}>
            <SurveyRespondee updateRespondeeName={updateRespondeeName} />
          </Grid>
          <Grid item xs={12}>
            <Questions setAnswers={setAnswers} questions={props.questions} message={message} />
          </Grid>
        </Grid>
      </Dialog>
      <Snackbars setSnack={setSnack} snack={snack} />
    </Grid>
  );
}

export default SurveyModalCard;
