import "./TeacherReview.css";
import TeacherItem from "../modules/TeacherItem";
import StarRating from "../modules/StarRating";
import { useEffect, useState } from "react";

const CRITERIA = [
  { key: "teaching_clarity", label: "Teaching Clarity" },
  { key: "subject_knowledge", label: "Subject Knowledge" },
  { key: "behaviour_respect", label: "Behaviour & Respect" },
  { key: "punctuality", label: "Punctuality" },
];

const defaultRatings = () =>
  Object.fromEntries(CRITERIA.map((c) => [c.key, 0]));

const IconMail = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconDept = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconPhd = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

function TeacherReview() {
  const [Teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setselectedTeacher] = useState(true);
  const [selectedTinfo, setselectedTinfo] = useState({});
  const [ratings, setRatings] = useState(defaultRatings());
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState(null);
  const [submitMsg, setSubmitMsg] = useState("");
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [examPapers, setExamPapers] = useState([]);

  const defaultPhoto =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg";

  // Fetch all teachers on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
        setFilteredTeachers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleSearch() {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      setFilteredTeachers(Teachers);
      return;
    }
    setFilteredTeachers(
      Teachers.filter((t) => t.name?.toLowerCase().includes(query)),
    );
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
    if (e.target.value === "") setFilteredTeachers(Teachers);
  }

  // When a teacher is selected: fetch their reviews + rating summary
  // replace your selectTeacher function
  function selectTeacher(TeachInfo) {
    setselectedTinfo(TeachInfo);
    setselectedTeacher(false);
    setRatings(defaultRatings());
    setComment("");
    setSubmitMsg("");
    setLoadingReviews(true);
    setExamPapers([]);

    const teacherId = TeachInfo.id;

    Promise.all([
      fetch(`http://localhost:5000/api/teacher-reviews/${teacherId}`).then(
        (r) => r.json(),
      ),
      fetch(`http://localhost:5000/api/teacher-rating/${teacherId}`).then((r) =>
        r.json(),
      ),
      fetch(`http://localhost:5000/api/teacher-papers/${teacherId}`).then((r) =>
        r.json(),
      ),
    ])
      .then(([reviewsData, summaryData, papersData]) => {
        setReviews(reviewsData);
        setRatingSummary(summaryData);
        setExamPapers(papersData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingReviews(false));
  }

  function handleStarChange(key, value) {
    setRatings((prev) => ({ ...prev, [key]: value }));
  }

  const totalScore = Object.values(ratings).reduce((a, b) => a + b, 0);
  const avgScore = (totalScore / CRITERIA.length).toFixed(1);

  // Submit review to API
  function handleSubmit() {
    const allRated = CRITERIA.every((c) => ratings[c.key] > 0);
    if (!allRated) {
      setSubmitMsg("Please rate all criteria before submitting.");
      return;
    }

    fetch("http://localhost:5000/api/teacher-reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        teacher_id: selectedTinfo.id,
        teaching_clarity: ratings.teaching_clarity,
        subject_knowledge: ratings.subject_knowledge,
        behaviour_respect: ratings.behaviour_respect,
        punctuality: ratings.punctuality,
        comment,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setSubmitMsg("✓ Review submitted successfully!");
        setRatings(defaultRatings());
        setComment("");
        // Refresh reviews and summary after submit
        return Promise.all([
          fetch(
            `http://localhost:5000/api/teacher-reviews/${selectedTinfo.id}`,
          ).then((r) => r.json()),
          fetch(
            `http://localhost:5000/api/teacher-rating/${selectedTinfo.id}`,
          ).then((r) => r.json()),
        ]);
      })
      .then(([reviewsData, summaryData]) => {
        setReviews(reviewsData);
        setRatingSummary(summaryData);
        // Update rating on the selected teacher info (detail card)
        if (summaryData) {
          const newRating = summaryData.overall_avg;
          setselectedTinfo((prev) => ({ ...prev, rating: newRating }));
          // Also update the rating in the teachers list so card shows updated value
          setTeachers((prev) =>
            prev.map((t) =>
              t.id === selectedTinfo.id ? { ...t, rating: newRating } : t,
            ),
          );
          setFilteredTeachers((prev) =>
            prev.map((t) =>
              t.id === selectedTinfo.id ? { ...t, rating: newRating } : t,
            ),
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setSubmitMsg("Something went wrong. Please try again.");
      });
  }

  const renderStars = (score) => {
    const rounded = Math.round(score);
    return (
      <>
        {"★".repeat(rounded)}
        {"☆".repeat(5 - rounded)}
      </>
    );
  };

  // NOTE: Neon returns lowercase column names — use designation not Designation
  const modifiedTeacherList = filteredTeachers.map((teacher) => (
    <TeacherItem
      key={teacher.id}
      id={teacher.id}
      name={teacher.name}
      Designation={teacher.designation} // Neon → lowercase
      email={teacher.email}
      photo={teacher.photo || defaultPhoto}
      phdSupervisor={teacher.phd_supervisor}
      department={teacher.department}
      rating={teacher.rating}
      selectTeacher={selectTeacher}
    />
  ));

  const FullTeacherList = (
    <>
      <header className="Search-sec">
        <div className="Search-input-wrapper">
          <svg
            className="Search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="Search-bar"
            type="text"
            placeholder="Search by teacher name…"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              className="Search-clear"
              onClick={() => {
                setSearchQuery("");
                setFilteredTeachers(Teachers);
              }}
            >
              ✕
            </button>
          )}
        </div>
        <button className="Search-btn" onClick={handleSearch}>
          Search
        </button>
      </header>

      {filteredTeachers.length === 0 && searchQuery && (
        <p className="Search-empty">
          No teachers found for "<strong>{searchQuery}</strong>"
        </p>
      )}

      <ul className="Teachers-container">{modifiedTeacherList}</ul>
    </>
  );

  const SelectTeach = (
    <div className="Teacher-detail-page">
      <button className="paper-btn" onClick={() => setselectedTeacher(true)}>
        ← Back to teachers
      </button>

      <div className="Teacher-detail-card">
        <img
          src={selectedTinfo.photo || defaultPhoto}
          alt={selectedTinfo.name || "Teacher"}
          className="Teacher-detail-image"
        />
        <h2>{selectedTinfo.name}</h2>
        <p>{selectedTinfo.designation}</p>
        <div className="teacher-chips">
          {selectedTinfo.department && (
            <span className="teacher-chip">
              <IconDept />
              {selectedTinfo.department}
            </span>
          )}
          {selectedTinfo.email && (
            <span className="teacher-chip">
              <IconMail />
              {selectedTinfo.email}
            </span>
          )}
          {selectedTinfo.phd_supervisor && (
            <span className="teacher-chip">
              <IconPhd />
              PhD Supervisor
            </span>
          )}
          {ratingSummary && (
            <span className="teacher-chip teacher-chip--star">
              ★ {ratingSummary.overall_avg} / 5 ({ratingSummary.total_reviews}{" "}
              reviews)
            </span>
          )}
        </div>
      </div>

      {/* Rating form */}
      {/* ── Exam papers this teacher created ── */}
      {examPapers.length > 0 && (
        <div className="teacher-papers-section">
          <h3 className="review-form-title">
            Exam papers
            <span className="review-count">({examPapers.length})</span>
          </h3>
          <div className="papers-chips-wrap">
            {examPapers.map((p) => (
              <span
                key={p.id}
                className={`paper-chip paper-chip--${p.difficulty?.toLowerCase()}`}
              >
                <span className="paper-chip-course">
                  {p.course_code || p.course_name}
                </span>
                <span className="paper-chip-divider" />
                <span className="paper-chip-meta">
                  {p.session} {p.year}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="review-form">
        <h3 className="review-form-title">Rate this teacher</h3>
        <div className="criteria-grid">
          {CRITERIA.map((c) => (
            <div key={c.key} className="criteria-card">
              <p className="criteria-label">{c.label}</p>
              <StarRating
                value={ratings[c.key]}
                onChange={(val) => handleStarChange(c.key, val)}
              />
              <span className="criteria-score">
                {ratings[c.key] > 0 ? `${ratings[c.key]} / 5` : "Not rated"}
              </span>
            </div>
          ))}
        </div>

        <div className="score-summary">
          <div>
            <span className="score-label">Total score</span>
            <span className="score-value">{totalScore} / 20</span>
          </div>
          <div>
            <span className="score-label">Average rating</span>
            <span className="score-value">{avgScore} / 5</span>
          </div>
        </div>

        <textarea
          className="review-comment-box"
          placeholder="Leave a comment (optional)…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {submitMsg && (
          <p
            className={`submit-msg ${submitMsg.startsWith("✓") ? "submit-msg--success" : ""}`}
          >
            {submitMsg}
          </p>
        )}

        <button className="submit-review-btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>

      {/* Past reviews */}
      <div className="past-reviews">
        <h3 className="review-form-title">
          Past reviews
          {reviews.length > 0 && (
            <span className="review-count">({reviews.length})</span>
          )}
        </h3>

        {loadingReviews && <p className="no-reviews">Loading reviews…</p>}

        {!loadingReviews && reviews.length === 0 && (
          <p className="no-reviews">No reviews yet — be the first!</p>
        )}

        {reviews.map((r, i) => {
          // Calculate avg from the 4 criteria columns
          const avg = (
            (r.teaching_clarity +
              r.subject_knowledge +
              r.behaviour_respect +
              r.punctuality) /
            4
          ).toFixed(1);
          return (
            <div key={i} className="review-item">
              <div className="review-item-header">
                <span className="reviewer-name">Anonymous</span>
                <span className="review-date">
                  {new Date(r.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="review-breakdown">
                {CRITERIA.map((c) => (
                  <span key={c.key} className="breakdown-badge">
                    {c.label}: {r[c.key]}/5
                  </span>
                ))}
              </div>
              <div className="review-avg">
                {renderStars(avg)}
                <span> {avg} / 5</span>
              </div>
              {r.comment && <p className="review-comment-text">{r.comment}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="Review-page">
      {selectedTeacher ? FullTeacherList : SelectTeach}
    </div>
  );
}

export default TeacherReview;
