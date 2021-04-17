import React, { useState, useEffect } from "react";
import axios from "axios";

/* 
Where is the value of "spots" stored for each day?
When should that value change?
How can we calculate how many spots should be available?

Tips

The appointment id is known when an interview is confirmed  or canceled by the server.
Changes should be limited to the useApplicationData.js file

Plan:

the value should change when an appointment is deleted or created, but NOT when edited
we get the appointment id when that happens (but also during edit? Check previous state and new state?)
spots are calculated by 5 - current interviews that aren't null

state.days[0].spots gives monday's spots but it does *not* update
could grab from axios again?
*/

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: []
  });
  // const setDay = day => setState({ ...state, day })
  const setDay = day => setState(prev => ({ ...prev, day }));
  useEffect(() => {
    const daysUrl = `/api/days`;
    const appointmentsUrl = '/api/appointments';
    const interviewersUrl = 'api/interviewers';

    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  const updateSpots = (res) => {
    // const dayIndex = Math.floor(id / 5)
    // grabs just the id of the interview that axios made a request to
    const interviewId = res.config.url.split('/').slice(-1)[0];
    const dayIndex = Math.floor(interviewId / 5);

    const daysUrl = `/api/days`;

    axios.get(daysUrl)
      .then(res => {
        setState(prev => ({ ...prev, days: res.data }));
      });
    // axios.get(daysUrl)
    //   .then(res => {
    //     setState(prev => ({ ...prev, ...prev.days[dayIndex].spots: res.data[dayIndex].spots}));
    //   });

    // axios.get(daysUrl)
    //   .then(res => console.log(res.data))

    // .then(res => console.log(res.data[dayIndex].spots))
  };

  function bookInterview(id, interview) {

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

    const putBody = {
      interview
    }

    return (
      axios.put(`/api/appointments/${id}`, putBody)
        .then((res) => updateSpots(res))
    )
  };

  function cancelInterview(id) {

    const interview = null;

    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    })

    return (
      axios.delete(`/api/appointments/${id}`, { interview })
        .then((res) => updateSpots(res))
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