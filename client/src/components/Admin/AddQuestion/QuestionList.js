import React from "react";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import QuestionRow from "./QuestionRow";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function QestionList(props) {
  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12}>
        <List>
          {props.questions.map((q, index) => (
            <QuestionRow
              onUp={() =>
                props.setQuestions(reorder(props.questions, index, index - 1))
              }
              onDown={() =>
                props.setQuestions(reorder(props.questions, index, index + 1))
              }
              deleteQuestion={props.deleteQuestion}
              setQuestions={props.setQuestions}
              key={q.id}
              length={props.questions.length}
              position={index}
              id={q.id}
              title={q.title}
              type={q.type}
              optional={q.optional}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
