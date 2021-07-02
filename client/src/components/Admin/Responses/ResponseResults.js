import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import SurveyTitle from "../../Shared/SurveyTitle";
import Questions from "../../Shared/Questions";
import SurveyRespondee from "../../Shared/SurveyRespondee";
import Stepper from "./Stepper";

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

export default function ResponseRow(props) {

  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Grid>
      <Dialog
        fullScreen
        open={props.open}
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
            <SurveyTitle title={props.responses[props.activeResponse].title} />
            <Stepper
              handleNext={props.handleNext}
              handleBack={props.handleBack}
              activeResponse={props.activeResponse}
              responseLength={props.responseLength}
            />
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="column"
          style={{ marginTop: "20px" }}
          alignItems="center"
        >
          <Grid item xs={12}>
            <SurveyRespondee
              respondee={props.responses[props.activeResponse].respondee}
              readonly={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Questions
              readonly={true}
              questions={props.responses[props.activeResponse].questions}
            />
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
}
