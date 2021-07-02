"use strict";

const express = require("express");
const morgan = require("morgan");
const { check, validationResult } = require("express-validator");
const session = require("express-session");

const app = new express();
const port = 3001;

const passport = require("passport");
const passportLocal = require("passport-local");

const daoMain = require("./dao/daoMain");
const daoAuth = require("./dao/daoAuth");

app.use(morgan("dev"));
app.use(express.json());

passport.use(
  new passportLocal.Strategy((username, password, done) => {
    daoAuth
      .getUser(username, password)
      .then((user) => {
        if (user) done(null, user);
        else done(null, false, { message: "Username or password wrong" });
      })
      .catch((err) => {
        done(err);
      });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  daoAuth
    .getUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  return res.status(401).json({ error: "Not authenticated" });
};

app.use(
  session({
    secret: "this and that and other",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*** APIs ***/

// GET /api/surveys
app.get("/api/surveys", (req, res) => {
  if (req.user !== undefined) {
  daoMain
    .getSurveys(req.user.id)
    .then((surveyList) => res.json(surveyList))
    .catch(() => res.status(500).end());
  } else {
    daoMain
    .getSurveys()
    .then((surveyList) => res.json(surveyList))
    .catch(() => res.status(500).end());
  }
});

// GET /api/reponses/:id
app.get("/api/responses/:id",  isLoggedIn, (req, res) => {
  const surveyId = req.params.id
  daoMain
    .getResponses(surveyId)
    .then((responseList) => res.json(responseList))
    .catch(() => res.status(500).end());
});

// POST /api/survey/add
app.post("/api/survey/add", isLoggedIn, (req, res) => {
  let id = req.user.id;
  let survey = JSON.stringify(req.body);
  daoMain
    .addSurvey(survey, id)
    .then(() => res.end())
    .catch(() => res.status(500).end());
});

// POST /api/response/add
app.post("/api/response/add", (req, res) => {
  let surveyId = req.body.id;
  let response = JSON.stringify(req.body);
  daoMain
    .addResponse(response, surveyId)
    .then(() => res.end())
    .catch(() => res.status(500).end());
});

/*** Users APIs ***/

// POST /sessions
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        return res.json(req.user);
      });
  })(req, res, next);
});

// DELETE /sessions/current
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
