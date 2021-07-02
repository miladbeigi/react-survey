import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddQuestionModal from "../AddQuestion/AddQuestionModal";
import { useHistory } from 'react-router-dom';

export default function SurveyInputTitle(props) {
  const [error, setError] = React.useState(false);
  const history = useHistory();

  const handlechange = (title) => {
    if (title === "") {
      setError(true);
    } else setError(false);
    props.setTitle(title);
  };
  const gohome = () => {
    history.push('/admin/home');
  }
  const handlepublish = () => {
    if (props.title === "") {
      setError(true);
      props.setSnack({
        open: true,
        message: "Please add the survey title",
        type: "error",
      });
    } else {
      props.publishSurvey();
    }
  };

  return (
    <>
      <Grid
        container
        justify="center"
        spacing={1}
        style={{ margin: 3 }}
        direction="row"
      >
        <Grid item>
          <Button
            onClick={() => gohome()}
            variant="outlined"
            color="secondary"
          >
            Home
          </Button>
        </Grid>
        <Grid item>
          <AddQuestionModal addQuestion={props.addQuestion} />
        </Grid>
        <Grid item>
          <Button
            onClick={() => handlepublish()}
            variant="contained"
            color="secondary"
          >
            Publish
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={3} alignItems="center">
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="filled-full-width"
              label="Title"
              error={error}
              placeholder="Write your title here..."
              fullWidth
              required
              onChange={(ev) => {
                handlechange(ev.target.value);
              }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <TextField
              id="filled-full-width"
              label="Description"
              placeholder="Describe this survey in few sentences..."
              fullWidth
              onChange={(ev) => {
                props.setDescription(ev.target.value);
              }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
}
