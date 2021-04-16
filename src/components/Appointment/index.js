import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from '../../hooks/useVisualMode'




export default function Appointment(props) {

  function save(name, interviewer) {
    transition(SAVING)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    // IMPORTANT! REMOVE LATER! KEPT FOR DEBUGGING BECAUSE INSTANTANIOUS SAVING
    setTimeout(() => {
      transition(SHOW)
    }, 1000)
  }
  function deleteInterview() {
    transition(DELETING)
    props.cancelInterview(props.id)
    // IMPORTANT! REMOVE LATER! KEPT FOR DEBUGGING BECAUSE INSTANTANIOUS DELETING
    setTimeout(() => {
      transition(EMPTY)
    }, 1000)
  }
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* The Various Modes/Visual States */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={deleteInterview} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
    </article>
  )
}
