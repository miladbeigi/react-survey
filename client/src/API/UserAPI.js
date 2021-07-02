async function getSurveys() {
  const response = await fetch("/api/surveys");
  const surveys = await response.json();
  if (response.ok) {
    return surveys;
  } else {
    return response;
  }
}

async function addSurvey(surveyJson) {
  const response = await fetch("/api/survey/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(surveyJson),
  });
  if (response.ok) {
    return response;
  } else {
    return response;
  }
}

async function getResponses(surveyId) {
  const response = await fetch("/api/responses/" + surveyId);
  const responses = await response.json();
  if (response.ok) {
    return responses;
  } else {
    return response;
  }
}

async function addResponse(surveyResponse) {
  const response = await fetch("/api/response/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(surveyResponse),
  });
  if (response.ok) {
    return response;
  } else {
    return response;
  }
}


async function logIn(credentials) {
  let response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch(err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch('/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch('/api/sessions/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;
  }
}

const API = { getSurveys, addResponse, getResponses, addSurvey, logIn, logOut, getUserInfo };
export default API;
