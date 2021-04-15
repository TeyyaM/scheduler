import React from 'react';

/* filter state.days by day
 grab .appointments array
 filter state.appointments by the items in the appointments array
 return an array with each item corresponding to the specifics of the appointment (use map???)
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

export { getAppointmentsForDay }
