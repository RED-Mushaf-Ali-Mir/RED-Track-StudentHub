// import "./CourseItem.css";

// function CourseItem(props) {
//   return (
//     <li className="Course-attribute">
//       <button
//         className="Course_btn"
//         onClick={() => {
//           props.selectCourse(props.id);
//         }}
//       >
//         <span className="Course-Name">{props.name}</span>
//         <span className="Course-Code">{props.code}</span>
//         <span className="Course-Papers">{props.papers}</span>
//       </button>
//     </li>
//   );
// }

// export default CourseItem;
import "./CourseItem.css";

function CourseItem(props) {
  return (
    <li className="Course-attribute">
      <button
        className="Course_btn"
        onClick={() => props.selectCourse(props.id, props.name)}
      >
        <span className="Course-Name">{props.name}</span>
        <span className="Course-Code">{props.code}</span>
      </button>
    </li>
  );
}

export default CourseItem;
