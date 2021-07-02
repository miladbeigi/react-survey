import { Grid } from "@material-ui/core";
import SurveyModalCard from "../components/Shared/SurveyModalCard";
import { useEffect, useState } from "react";
import API from "../API/UserAPI";

const Content = (props) => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    async function loadSurveys() {
      const loadedSurveys = await API.getSurveys();
      setSurveys(loadedSurveys);
    }
    loadSurveys();
  }, []);

  const getSurveyList = (surveyCardObj, index) => {
    return (
      <Grid key={index} item xs={12} sm={4}>
        <SurveyModalCard loggedIn={props.loggedIn} {...surveyCardObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {surveys.map((surveyCardObj, index) =>
        getSurveyList(surveyCardObj, index)
      )}
    </Grid>
  );
};

export default Content;
