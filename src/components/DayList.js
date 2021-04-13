import React from "react";
import DayListItem from "./DayListItem";
// import "components/DayList.scss";

// const classNames = require('classnames');



export default function DayList(props) {

  const { days, setDay } = props;
  const dayList = days.map(day => {
    return (
      <ul>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={setDay} />
      </ul>

    );
  })
  return dayList;

}