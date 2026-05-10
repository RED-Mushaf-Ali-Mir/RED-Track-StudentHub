import { useState } from "react";
import "./StarRating.css";
//AI
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`star ${i <= (hovered || value) ? "star-filled" : "star-empty"}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
