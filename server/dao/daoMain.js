/* Data Access Object (DAO) module for accessing tasks */
"use strict";

const sqlite = require("sqlite3");

const db = new sqlite.Database("./db/survey.db", (err) => {
  if (err) throw err;
});

exports.getSurveys = (id) => {
  return new Promise((resolve, reject) => {
    if (id === undefined) {
      const sql =
        "SELECT  s.id , s.survey, COUNT (res.id) as count FROM surveys s LEFT JOIN responses res ON res.survey_id = s.id GROUP BY s.id;";
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const surveyList = rows.map((e) => {
          const surveyJson = JSON.parse(e.survey);
          return { ...surveyJson, id: e.id, count: e.count };
        });
        resolve(surveyList);
      });
    } else {
      const sql =
        "SELECT  s.id, s.owner , s.survey, COUNT (res.id) as count FROM surveys s LEFT JOIN responses res ON res.survey_id = s.id WHERE owner = ? GROUP BY s.id;";
      db.all(sql, [id], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const surveyList = rows.map((e) => {
          const surveyJson = JSON.parse(e.survey);
          return { ...surveyJson, id: e.id, count: e.count };
        });
        resolve(surveyList);
      });
    }
  });
};

exports.getResponses = (surveyId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM responses WHERE survey_id = ?";
    db.all(sql, [surveyId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const responseList = rows.map((res) => JSON.parse(res.response));
      resolve(responseList);
    });
  });
};

exports.addSurvey = (survey, id) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO surveys (survey, owner) VALUES (?,?)";
    db.run(sql, [survey, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.addResponse = (response, surveyId) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO responses (response, survey_id) VALUES (?,?)";
    db.run(sql, [response, surveyId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};
