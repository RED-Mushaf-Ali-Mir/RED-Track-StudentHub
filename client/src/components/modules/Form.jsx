import { use, useState } from "react";
import Grades from "./Grades";
import Credits from "./Credit";

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

function Form(props) {
  const [entry, setEntry] = useState("");
  const [grade, setGrade] = useState("Grade");
  const [crdhr, setCrdhr] = useState("Credit");
  const [errPlacehl, seterrPlacehl] = useState("");

  function gradeSelection(value) {
    setGrade(value);
  }

  function creditSelection(value) {
    setCrdhr(value);
  }

  function handleChange(event) {
    setEntry(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (crdhr === "Credit" || grade === "Grade") {
      seterrPlacehl("Select Both CRDHR & Grade");
      return;
    } else if (entry.replace(/\s/g, "").length !== 0) {
      props.onSubmit(entry, crdhr, grade);
    } else {
      props.onSubmit("Course", crdhr, grade);
    }
    setEntry("");
    setCrdhr("Credit");
    setGrade("Grade");
  }

  const updatedGrades = grades.map((tmpgrade) => {
    return <Grades btnGrade={tmpgrade} gradeSelection={gradeSelection} />;
  });

  const updatedCredit = credits.map((crd) => {
    return <Credits btnCrd={crd} creditSelection={creditSelection} />;
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            Add Course Details
          </label>
        </h2>

        <div className="form-row">
          <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={entry}
            onChange={handleChange}
            placeholder={errPlacehl}
          />

          <div className="dropdown small">
            <button className="btn">{crdhr}</button>
            <div className="dropdown-content">{updatedCredit}</div>
          </div>

          <div className="dropdown small">
            <button className="btn">{grade}</button>
            <div className="dropdown-content">{updatedGrades}</div>
          </div>
        </div>
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
      <div className="calculate-Btn">
        <button
          onClick={() => props.calculateGPA()}
          className="btn btn__gpaCal btn__lg"
        >
          Calculate GPA
        </button>
      </div>
    </>
  );
}

export default Form;
