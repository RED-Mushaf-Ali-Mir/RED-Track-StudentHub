function Credits(props) {
  return (
    <a onClick={() => props.creditSelection(props.btnCrd)} className="btn">
      {props.btnCrd}
    </a>
  );
}
export default Credits;
