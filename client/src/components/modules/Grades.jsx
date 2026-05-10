function Grades(props) {
  return (
    <a onClick={() => props.gradeSelection(props.btnGrade)} className="btn">
      {props.btnGrade}
    </a>
  );
}
export default Grades;
