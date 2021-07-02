import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ResponseRow from "./ResponseRow";
import ResponseResults from "./ResponseResults";
import Button from "@material-ui/core/Button";
import API from "../../../API/UserAPI";
import Progress from "./Progress";
import { useHistory } from 'react-router-dom';

export default function ResponseList(props) {
  const history = useHistory();
  const [responses, setResponses] = useState([]);
  const [activeResponse, setactiveResponse] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [waiting, setWaiting] = useState(true);

  const handleNext = () => {
    setactiveResponse((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setactiveResponse((prevActiveStep) => prevActiveStep - 1);
  };

  const gohome = () => {
    history.push('/admin/home');
  }

  const { surveyId } = useParams();

  useEffect(() => {
    async function loadResponses(surveyId) {
      const loadedResponses = await API.getResponses(surveyId);
      setResponses(loadedResponses);
      setWaiting(false);
    }
    setWaiting(true);
    loadResponses(surveyId);
  }, [surveyId]);

  return (
    <>
      {waiting === true ? (
        <Progress />
      ) : (
        <>
          <Grid container direction="row" spacing={2} style={{ marginTop: 10}}>
            <Grid item xs={12}>
            <Button
                style={{ marginRight: 10 }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  gohome()
                }}
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Show all results
              </Button>
              <ResponseResults
                responses={responses}
                activeResponse={activeResponse}
                open={open}
                handleNext={handleNext}
                handleBack={handleBack}
                setOpen={setOpen}
                responseLength={responses.length}
              />
            </Grid>
            <Grid item xs={12}>
              <List>
                {responses.map((res) => (
                  <ResponseRow
                    id={res.id}
                    title={res.title}
                    respondee={res.respondee}
                    description={res.description}
                    questions={res.questions}
                  />
                ))}
              </List>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
