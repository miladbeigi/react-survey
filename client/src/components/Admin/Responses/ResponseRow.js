import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <IconButton
              id="milad"
              onClick={handleClickOpen}
              aria-label="delete"
              color="standard"
            >
              <VisibilityIcon />
            </IconButton>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Survey Title"} secondary={props.title} />
        <ListItemText primary={"Description"} secondary={props.description} />
        <ListItemText primary={"Respondee"} secondary={props.respondee} />
        <ListItemSecondaryAction></ListItemSecondaryAction>
      </ListItem>
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
            </Toolbar>
          </AppBar>
          <Grid
            container
            direction="column"
            style={{ marginTop: "20px" }}
            alignItems="center"
          >
            <Grid item xs={12}>
              <SurveyRespondee respondee={props.respondee} readonly={true} />
            </Grid>
            <Grid item xs={12}>
              <Questions readonly={true} questions={props.questions} />
            </Grid>
          </Grid>
        </Dialog>
    </Grid>
  );
}
