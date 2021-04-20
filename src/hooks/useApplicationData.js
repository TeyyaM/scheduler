import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  });
  // const setDay = day => setState({ ...state, day })
  const setDay = day => setState(prev => ({ ...prev, day }));
  useEffect(() => {
    const daysUrl = '/api/days';
    const appointmentsUrl = '/api/appointments';
    const interviewersUrl = '/api/interviewers';
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  useEffect(() => {

    const getSpotsForDay = (dayObj, appointments) => {

      // checks all the appointments for the day and returns the number of null interviews
      return (dayObj.appointments.reduce((accumulator, currentValue) => {
        if (!appointments[currentValue].interview) {
          accumulator++
        }
        return accumulator
      }, 0));
    };


    const updateSpots = function(dayName, days, appointments) {

      const dayObj = days.find(day => day.name === dayName);

      // calculate spots for the day
      const spots = getSpotsForDay(dayObj, appointments);

      // make a copy of the day, replacing the spots value
      const newDay = { ...dayObj, spots };
      // replace just the changed day with the newDay object in an unmutable way
      const newDays = days.map(day => day.name === dayName ? newDay : day);

      setState(prev => ({ ...prev, days: newDays }));

    };

    // skips first render when state is mostly empty
    if (state.days.length) {
      updateSpots(state.day, state.days, state.appointments);
    }

  }, [state.appointments]);

  function bookInterview(id, interview) {

    const putBody = {
      interview
    }

    return (
      axios.put(`/api/appointments/${id}`, putBody)
        .then(() => {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          setState({
            ...state,
            appointments
          })
        })
    )
  };

  function cancelInterview(id) {

    return (
      axios.delete(`/api/appointments/${id}`, { interview: null })
        .then((res) => {

          const appointment = {
            ...state.appointments[id],
            interview: null
          };

          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          setState({
            ...state,
            appointments
          })
        })
    )

  };

  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  )

}