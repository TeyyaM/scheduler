import React from 'react';

function getForDay(state, selectedDay, searchWord) {
  const filteredDay = state.days.find(day => day.name === selectedDay);
  if (filteredDay) {
    const returnArr = filteredDay[searchWord].map(searchId => {
      return state[searchWord][searchId];
    })
    return returnArr;
  }
  return [];

};

function getInterviewersForDay(state, selectedDay) {
  return getForDay(state, selectedDay, 'interviewers');
};

function getAppointmentsForDay(state, selectedDay) {
  return getForDay(state, selectedDay, 'appointments');
};

function getInterview(state, interview) {
  const returnObj = { ...interview }
  if (interview) {
    returnObj.interviewer = state.interviewers[returnObj.interviewer];
    return returnObj
  }
  return (interview);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay }
