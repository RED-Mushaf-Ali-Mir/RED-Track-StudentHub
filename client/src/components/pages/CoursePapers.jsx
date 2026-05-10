// import "./CoursePapers.css";
// import CourseItem from "../modules/CourseItem";
// import PaperList from "../modules/PaperList";
// import React, { useEffect, useState } from "react";

// function CoursePapers(props) {
//   const [checkPapers, setCheckPapers] = useState(false);
//   const [selectedPaper, setSelectedPaper] = useState([]);
//   const [courseList, setCourseList] = useState([{}]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredList, setFilteredList] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/courses")
//       .then((res) => res.json())
//       .then((data) => {
//         setCourseList(data);
//         setFilteredList(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   // Search: filter by name or code
//   function handleSearch() {
//     const query = searchQuery.trim().toLowerCase();
//     if (query === "") {
//       setFilteredList(courseList);
//       return;
//     }
//     const results = courseList.filter(
//       (course) =>
//         course.name?.toLowerCase().includes(query) ||
//         course.code?.toLowerCase().includes(query),
//     );
//     setFilteredList(results);
//   }

//   // Also search on Enter key
//   function handleKeyDown(e) {
//     if (e.key === "Enter") handleSearch();
//   }

//   // Clear search when input is emptied
//   function handleInputChange(e) {
//     setSearchQuery(e.target.value);
//     if (e.target.value === "") {
//       setFilteredList(courseList);
//     }
//   }

//   function selectCourse(id) {
//     const filteredPapers = props.pastPapers.filter((paper) => paper.id === id);
//     const coursePapers = filteredPapers?.map((paper) => (
//       <PaperList
//         id={paper.id}
//         session={paper.session}
//         year={paper.year}
//         papers={paper.papers}
//         link={paper.link}
//         difficulty={paper.difficulty}
//       />
//     ));
//     setSelectedPaper(coursePapers);
//     setCheckPapers(true);
//   }

//   function papercount(id) {
//     let count = 0;
//     props.pastPapers.forEach((paper) => {
//       if (paper.id === id) count = count + 1;
//     });
//     return count;
//   }

//   const CourseList = filteredList.map((course) => (
//     <CourseItem
//       key={course._id}
//       id={course._id}
//       name={course.name}
//       code={course.code}
//       papers={papercount(course.id)}
//       favorite={course.favorite}
//       selectCourse={selectCourse}
//     />
//   ));

//   const courseTemplate = (
//     <>
//       <header className="Search-sec">
//         <div className="Search-input-wrapper">
//           <svg
//             className="Search-icon"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="11" cy="11" r="8" />
//             <line x1="21" y1="21" x2="16.65" y2="16.65" />
//           </svg>
//           <input
//             className="Search-bar"
//             type="text"
//             placeholder="Search by course name or code…"
//             value={searchQuery}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//           />
//           {searchQuery && (
//             <button
//               className="Search-clear"
//               onClick={() => {
//                 setSearchQuery("");
//                 setFilteredList(courseList);
//               }}
//             >
//               ✕
//             </button>
//           )}
//         </div>
//         <button className="Search-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </header>

//       {filteredList.length === 0 && searchQuery && (
//         <p className="Search-empty">
//           No courses found for "<strong>{searchQuery}</strong>"
//         </p>
//       )}

//       <ul className="Course-List">{CourseList}</ul>
//     </>
//   );

//   const papersTemplate = (
//     <div>
//       <button onClick={() => setCheckPapers(false)} className="paper-btn">
//         ← Go Back
//       </button>
//       {selectedPaper}
//     </div>
//   );

//   return (
//     <div className="Course-page">
//       {checkPapers ? papersTemplate : courseTemplate}
//     </div>
//   );
// }

// export default CoursePapers;
import "./CoursePapers.css";
import CourseItem from "../modules/CourseItem";
import PaperList from "../modules/PaperList";
import React, { useEffect, useState } from "react";

function CoursePapers() {
  const [checkPapers, setCheckPapers] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState([]);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingPapers, setLoadingPapers] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourseList(data);
        setFilteredList(data);
      })
      .catch((err) => console.error(err));
  }, []);

  function handleSearch() {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") {
      setFilteredList(courseList);
      return;
    }
    const results = courseList.filter(
      (course) =>
        course.name?.toLowerCase().includes(query) ||
        course.code?.toLowerCase().includes(query),
    );
    setFilteredList(results);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleInputChange(e) {
    setSearchQuery(e.target.value);
    if (e.target.value === "") setFilteredList(courseList);
  }

  // Fetch papers for the selected course from API using course_id (FK)
  function selectCourse(courseId, courseName) {
    setSelectedCourseName(courseName);
    setLoadingPapers(true);
    setCheckPapers(true);
    setSelectedPaper([]);

    fetch(`http://localhost:5000/api/pastpapers/${courseId}`)
      .then((res) => res.json())
      .then((papers) => {
        const paperElements = papers.map((paper) => (
          <PaperList
            key={paper.id}
            id={paper.id}
            session={paper.session}
            year={paper.year}
            link={paper.link}
            difficulty={paper.difficulty}
          />
        ));
        setSelectedPaper(paperElements);
      })
      .catch((err) => {
        console.error(err);
        setSelectedPaper([]);
      })
      .finally(() => setLoadingPapers(false));
  }

  const CourseList = filteredList.map((course) => (
    <CourseItem
      key={course.id}
      id={course.id}
      name={course.name}
      code={course.code}
      papers={course.papers}
      selectCourse={selectCourse}
    />
  ));

  const courseTemplate = (
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
            placeholder="Search by course name or code…"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button
              className="Search-clear"
              onClick={() => {
                setSearchQuery("");
                setFilteredList(courseList);
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

      {filteredList.length === 0 && searchQuery && (
        <p className="Search-empty">
          No courses found for "<strong>{searchQuery}</strong>"
        </p>
      )}

      <ul className="Course-List">{CourseList}</ul>
    </>
  );

  const papersTemplate = (
    <div>
      <button
        onClick={() => {
          setCheckPapers(false);
          setSelectedPaper([]);
        }}
        className="paper-btn"
      >
        ← Go Back
      </button>
      <h2 className="papers-course-title">{selectedCourseName}</h2>
      {loadingPapers ? (
        <p className="papers-loading">Loading papers…</p>
      ) : selectedPaper.length === 0 ? (
        <p className="papers-empty">
          No past papers available for this course yet.
        </p>
      ) : (
        <div className="papers-list">{selectedPaper}</div>
      )}
    </div>
  );

  return (
    <div className="Course-page">
      {checkPapers ? papersTemplate : courseTemplate}
    </div>
  );
}

export default CoursePapers;
