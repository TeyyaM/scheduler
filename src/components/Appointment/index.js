import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from '../../hooks/useVisualMode'




export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* The Various Modes/Visual States */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} /* onSave={() => transition(SAVE)} */ />}
    </article>
  )
}
/* before trying to find prop keys */
// export default function Appointment(props) {
//   const EMPTY = "EMPTY";
//   const SHOW = "SHOW";
//   const CREATE = "CREATE";
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );
//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {/* The Various Modes/Visual States */}
//       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//         />
//       )}
//       {mode === CREATE && <Form /* interviewers={props.interviewers} */ />}
//     </article>
//   )
// }

// export default function Appointment(props) {
//   const EMPTY = "EMPTY";
//   const SHOW = "SHOW";
//   const CREATE = "CREATE";
//   const { mode, transition, back } = useVisualMode(
//     props.interview ? SHOW : EMPTY
//   );
//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       {mode === EMPTY && <Empty onAdd={() => console.log("Clicked onAdd")} />}
//       {mode === SHOW && (
//         <Show
//           student={props.interview.student}
//           interviewer={props.interview.interviewer}
//         />
//       )}
//     </article>
//   )
// }
// export default function Appointment(props) {
