import React from "react";
import Grid from "@material-ui/core/Grid";
import CheckboxQuestion from "./CheckboxQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import List from "@material-ui/core/List";

export default function Questions(props) {
  const updateTextAnswer = (ansObj) => {
    props.setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id == ansObj.id) return ansObj;
        else return ans;
      });
    });
  };

  const updateChoiceAnswer = (ansObj) => {
    props.setAnswers((oldAnswers) => {
      return oldAnswers.map((ans) => {
        if (ans.id == ansObj.id) return { ...ansObj };
        else return ans;
      });
    });
  };

  const getQuestionType = (questionObj, index) => {
    if (questionObj.type === "OpenEnded")
      return (
        <OpenEndedQuestion
          readonly={props.readonly}
          updateTextAnswer={updateTextAnswer}
          key={index}
          {...questionObj}
        />
      );
    else
      return (
        <CheckboxQuestion
          readonly={props.readonly}
          message={props.message}
          key={index}
          {...questionObj}
          updateChoiceAnswer={updateChoiceAnswer}
        />
      );
  };

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={1}>
        <List>
          {props.questions.map((element, index) =>
            getQuestionType(element, index)
          )}
        </List>
      </Grid>
    </React.Fragment>
  );
}
