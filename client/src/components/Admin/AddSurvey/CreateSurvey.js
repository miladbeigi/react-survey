// React
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// APP
import SurveyInputTitle from "./SurveyInputTitle";
import QestionList from "../AddQuestion/QuestionList";
import API from "../../../API/UserAPI";
import dayjs from "dayjs";
import Snackbars from "../../Shared/Snackbars";

const CreateSurvey = (props) => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    type: "",
  });

  const publishSurvey = () => {
    if (questions.length === 0) {
      setSnack({
        open: true,
        message: "Please add one question",
        type: "error",
      });
    } else {
      const surveyJson = {
        title: title,
        description: description,
        date: dayjs().format("YYYY-MM-DD"),
        owner: props.user.id,
        questions: questions,
      };

      API.addSurvey(surveyJson)
        .then(() => {
          setSnack({
            open: true,
            message: "Success",
            type: "success",
          });
          setTimeout(function () {
            history.push("/admin/home/");
          }, 1000);
        })
        .catch((error) => {
          setSnack({
            open: true,
            message: error,
            type: "error",
          });
        });
    }
  };

  const deleteQuestion = (questionId) => {
    setQuestions((oldQuestions) =>
      oldQuestions.filter((q) => q.id !== questionId)
    );
  };

  const addQuestion = (questionObj) => {
    let newId = 0;
    if (questions.length !== 0) {
      newId = Math.max(...questions.map((q) => q.id)) + 1;
    }
    setQuestions((oldQuestions) => [
      ...oldQuestions,
      { ...questionObj, id: newId },
    ]);
  };
  return (
    <>
      <SurveyInputTitle
        setSnack={setSnack}
        addQuestion={addQuestion}
        questions={questions}
        publishSurvey={publishSurvey}
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
        description={description}
      />
      <QestionList
        questions={questions}
        deleteQuestion={deleteQuestion}
        setQuestions={setQuestions}
      />
      <Snackbars setSnack={setSnack} snack={snack} />
    </>
  );
};

export default CreateSurvey;
