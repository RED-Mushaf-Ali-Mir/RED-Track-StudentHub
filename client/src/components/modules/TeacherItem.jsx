import "./TeacherItem.css";
import { MdEmail } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function TeacherItem(props) {
  return (
    <>
      <li
        className="Teacher-item"
        onClick={() => {
          props.selectTeacher(props);
        }}
      >
        <div className="Image-container">
          <div className="Detail-container">
            <span className="Teacher-name">{props.name}</span>
            <span className="Designation ">{props.Designation}</span>

            <span className="Teacher-department">{props.department}</span>
          </div>
          <img
            src={props.photo}
            alt="Teacher Image"
            className="Teacher-image"
          />
        </div>
        <div className="Button-section">
          <a
            href={`mailto:${props.email}`}
            className="Email-link"
            title="Send Email"
          >
            <MdEmail />
          </a>

          <span className="Teacher-rating" title="Rating">
            <FaStar className="Star-icon" />
            {props.rating}
          </span>
        </div>
      </li>
    </>
  );
}
export default TeacherItem;
