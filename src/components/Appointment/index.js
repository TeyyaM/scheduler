import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from '../../hooks/useVisualMode'




export default function Appointment(props) {

  function save(name, interviewer) {
    transition(SAVING, true)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        transition(ERROR_SAVE, true)
      })

  };

  function deleteInterview() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true)
      })

  }
  const EMPTY = "EMPTY";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
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
      {mode === ERROR_SAVE && <Error onClose={() => back()} message="Save" />}
      {mode === ERROR_DELETE && <Error onClose={() => back()} message="Delete" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(CREATE)}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
        interview={props.interview} />}
    </article>
  )
}
