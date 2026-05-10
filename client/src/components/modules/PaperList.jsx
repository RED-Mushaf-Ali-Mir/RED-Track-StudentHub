import "./PaperList.css";

function PaperList(props) {
  // Color badge based on difficulty
  const difficultyClass = props.difficulty
    ? `difficulty--${props.difficulty.toLowerCase()}`
    : "";

  return (
    <div className="paper-container">
      <a
        className="Link-container"
        href={props.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        style={!props.link ? { pointerEvents: "none", opacity: 0.5 } : {}}
      >
        <div className="paper-left">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="session-name">
            {props.session} — {props.year}
          </span>
        </div>
        <div className="paper-right">
          {props.difficulty && (
            <span className={`difficulty-badge ${difficultyClass}`}>
              {props.difficulty}
            </span>
          )}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </a>
    </div>
  );
}

export default PaperList;
