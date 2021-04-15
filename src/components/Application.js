import React, { useState, useEffect } from "react";
import axios from "axios";
// axios.defaults.proxy.host = "http://localhost:8001";

import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Lyla",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Definitely Not Lydia",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    // appointments: {}
  });
  const setDays = days => setState(prev => ({ ...prev, days }));;
  //above removes dependency warning of below
  // const setDays = days => setState({ ...state, days });
  useEffect(() => {
    const url = `/api/days`;
    axios.get(url)
      .then(res => {
        setDays(res.data)
      })

  }, [])

  const schedule = appointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              value={state.day}
              days={state.days}
              day={state.day}
              setDay={day => setState({ ...state, day })}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </>}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>

  );
}
