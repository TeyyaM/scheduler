import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

// const classNames = require('classnames');



export default function InterviewerList(props) {
  const [interviewer, setInterviewer] = useState("");

  const interviewerList = props.interviewers.map(currentInterviewer => {
    return (
      <InterviewerListItem
        key={currentInterviewer.id}
        avatar={currentInterviewer.avatar}
        name={currentInterviewer.name}
        selected={currentInterviewer.name === interviewer}
        setInterviewer={setInterviewer} />
      // setInterviewer={props.setInterviewer} />
    )
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );

}