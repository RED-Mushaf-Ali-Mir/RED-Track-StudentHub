import { useState } from "react";
import Credits from "./Credit";
import Grades from "./Grades";

const grades = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "F",
];
const credits = ["3", "2", "1"];

function Course(props) {
  const [Editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState(props.grade);
  const [newCredit, setNewCredit] = useState(props.creditHour);

  function gradeSelection(value) {
    setNewGrade(value);
  }

  function creditSelection(value) {
    setNewCredit(value);
  }

  const updatedGrades = grades.map((tmpgrade) => {
    return <Grades btnGrade={tmpgrade} gradeSelection={gradeSelection} />;
  });

  const updatedCredit = credits.map((crd) => {
    return <Credits btnCrd={crd} creditSelection={creditSelection} />;
  });

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleSave(event) {
    event.preventDefault();
    if (newName.replace(/\s/g, "").length === 0) {
      props.editCourse("Course", props.id, newGrade, newCredit);
    } else {
      props.editCourse(newName, props.id, newGrade, newCredit);
    }
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSave}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <div className="form-row">
          <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            onChange={handleChange}
          />
          <div className="dropdown small">
            <button className="btn">{newGrade}</button>
            <div className="dropdown-content">{updatedGrades}</div>
          </div>

          <div className="dropdown small">
            <button className="btn">{newCredit}</button>
            <div className="dropdown-content">{updatedCredit}</div>
          </div>
        </div>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        {/* <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleCourse(props.id)}
        /> */}
        <label className="todo-label gradeANDcrdhr1" htmlFor={props.id}>
          {props.name}
        </label>

        <label className="todo-label gradeANDcrdhr1" htmlFor={props.id}>
          Grade :{props.grade} CreditHour : {props.creditHour}
        </label>
      </div>
      <div className="btn-group">
        <button type="button" className="btn" onClick={() => setEditing(true)}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteCourse(props.id)}
        >
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  return <li className="todo">{Editing ? editingTemplate : viewTemplate} </li>;
}

export default Course;
//   <li className="todo stack-small">
//       <div className="c-cb">
//         <input
//           id={props.id}
//           type="checkbox"
//           defaultChecked={props.Completed}
//           onChange={() => {
//             props.toggleCourse(props.id);
//           }}
//         />
//         <label className="todo-label" htmlFor={props.id}>
//           {props.name}
//         </label>
//       </div>
//       <div className="btn-group">
//         <button type="button" className="btn">
//           Edit <span className="visually-hidden">{props.name}</span>
//         </button>
//         <button
//           type="button"
//           className="btn btn__danger"
//           onClick={() => {
//             props.deleteCourse(props.id);
//           }}
//         >
//           Delete <span className="visually-hidden">{props.name}</span>
//         </button>
//       </div>
//     </li>
