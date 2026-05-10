import Course from "../modules/Course";
import Form from "../modules/Form";
import { useState } from "react";
import { nanoid } from "nanoid";
import "./Calculator.css";

function Calculator(props) {
  const [courses, setCourses] = useState(props.courses);
  const [gpa, setGpa] = useState("");

  function editCourse(name, id, newGrade, newCredit) {
    const editedCourse = courses.map((course) => {
      if (id === course.id)
        return {
          ...course,
          name: name,
          grade: newGrade,
          creditHour: newCredit,
        };

      return course;
    });
    setCourses(editedCourse);
  }

  function toggleCourse(id) {
    const updateCourse = courses.map((course) => {
      if (course.id === id) {
        return { ...course, completed: !course.completed };
      }
      return course;
    });
    setCourses(updateCourse);
  }

  function deleteCourse(id) {
    const updatedCourse = courses.filter((course) => id !== course.id);
    setCourses(updatedCourse);
  }

  function onSubmit(name, crd, grade) {
    const newCourse = {
      id: `todo-${nanoid()}`,
      name: name,
      completed: false,
      creditHour: crd,
      grade: grade,
    };
    setCourses([...courses, newCourse]);
  }
  const CourseList = courses?.map((course) => (
    <Course
      id={course.id}
      name={course.name}
      completed={course.completed}
      key={course.id}
      grade={course.grade}
      creditHour={course.creditHour}
      toggleCourse={toggleCourse}
      deleteCourse={deleteCourse}
      editCourse={editCourse}
      gradePoint={0}
    />
  ));

  function calculateGPA() {
    const gradePointaded = courses?.map((course) => {
      if (course.grade === "A+") return { ...course, gradePoint: 4 };
      else if (course.grade === "A") return { ...course, gradePoint: 4 };
      else if (course.grade === "A-") return { ...course, gradePoint: 3.67 };
      else if (course.grade === "B+") return { ...course, gradePoint: 3.33 };
      else if (course.grade === "B") return { ...course, gradePoint: 3 };
      else if (course.grade === "B-") return { ...course, gradePoint: 2.67 };
      else if (course.grade === "C+") return { ...course, gradePoint: 2.33 };
      else if (course.grade === "C") return { ...course, gradePoint: 2 };
      else if (course.grade === "C-") return { ...course, gradePoint: 1.67 };
      else if (course.grade === "D+") return { ...course, gradePoint: 1.33 };
      else if (course.grade === "D") return { ...course, gradePoint: 1 };
      else if (course.grade === "F") return { ...course, gradePoint: 0 };
    });

    let totalPoints = 0;
    let totalCredits = 0;

    gradePointaded.forEach((course) => {
      totalPoints += course.gradePoint * Number(course.creditHour);
      totalCredits += Number(course.creditHour);
    });

    setGpa((totalPoints / totalCredits).toFixed(2));
  }

  return (
    <div className="calculator-root">
      <div className="todoapp stack-large">
        <h1>FAST NUCES GPA Calculator</h1>
        <Form onSubmit={onSubmit} calculateGPA={calculateGPA} />

        {/* <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div> */}
        <h2 id="list-heading">{`GPA : ${gpa}`}</h2>
        <h2 id="list-heading">{`Course Added ${CourseList.length}`}</h2>

        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {CourseList}
        </ul>
        <div className="creator-info">
          <a
            href="https://github.com/RED-Mushaf-Ali-Mir"
            target="_blank"
            rel="noopener noreferrer"
          >
            @GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/mushaf-ali-mir-6a32b6295?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            @LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
