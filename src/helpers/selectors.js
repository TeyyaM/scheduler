import React from 'react';

/* 

*/

function getInterviewersForDay(state, selectedDay) {
  const filteredDay = state.days.filter(day => day.name === selectedDay);
  if (filteredDay.length) {
    const interviewerArr = filteredDay[0].interviewers.map(interviewerId => {
      return state.interviewers[interviewerId];
    })
    return interviewerArr;
  }
  return [];

};

function getAppointmentsForDay(state, selectedDay) {
  const filteredDay = state.days.filter(day => day.name === selectedDay);
  if (filteredDay.length) {
    const appointmentArr = filteredDay[0].appointments.map(appointmentId => {
      return state.appointments[appointmentId];
    })
    return appointmentArr;
  }
  return [];

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
