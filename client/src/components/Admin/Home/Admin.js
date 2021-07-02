// React
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
// Material-UI
import { Grid } from "@material-ui/core";
// APP
import SurveyModalCard from "../../Shared/SurveyModalCard";
import AdminButtons from "./AdminButtons";
import ResponseList from "../Responses/ResponseList";
import CreateSurvey from "../AddSurvey/CreateSurvey";
import API from "../../../API/UserAPI";

const Admin = (props) => {
  const [surveys, setSurveys] = useState([]);

  const getSurveyList = (surveyCardObj, index) => {
    return (
      <Grid key={index} item xs={12} sm={4}>
        <SurveyModalCard loggedIn={props.loggedIn} {...surveyCardObj} />
      </Grid>
    );
  };

  useEffect(() => {
    async function loadSurveys() {
      const loadedSurveys = await API.getSurveys();
      setSurveys(loadedSurveys);
    }
    loadSurveys();
  }, []);

  return (
    <Grid container spacing={3}>
      <Switch>
        <Route
          path="/admin/home"
          strict
          render={() => (
            <>
              <Grid container>
                <AdminButtons />
              </Grid>
              {surveys.map((surveyCardObj, index) =>
                getSurveyList(surveyCardObj, index)
              )}
            </>
          )}
        />
        <Route path="/admin/create" strict render={() => <CreateSurvey user={props.user} />} />
        <Route path={["/admin/results/:surveyId"]}>
          <ResponseList />
        </Route>
      </Switch>
    </Grid>
  );
};

export default Admin;
