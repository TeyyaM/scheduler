import React from 'react';

/* 
interview.interviewer 
is the interviewer id
return object with student: "studentName" 
interview.student = student 
just need to change the interview.interviewer then return interview
and 
interviewer: state.interviewers[interviewerId]
*/


function getAppointmentsForDay(state, selectedDay) {
  const filteredDay = state.days.filter(day => day.name === selectedDay);
  if (filteredDay.length) {
    const appointmentArr = filteredDay[0].appointments.map(appointmenId => {
      return state.appointments[appointmenId];
    })
    return appointmentArr;
  }
  return [];

};

function getInterview(state, interview) {
  if (interview) {
    interview.interviewer = state.interviewers[interview.interviewer];
  }
  return (interview);
};

export { getAppointmentsForDay, getInterview }
