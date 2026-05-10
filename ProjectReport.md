# Red-Track-StudentHub — GitHub README.md

````md
# Red-Track-StudentHub

**FAST-NUCES | DBMS Semester Project | Spring 2026**

Red-Track-StudentHub is a full-stack academic web portal developed as a Database Management Systems semester project at FAST-NUCES. The platform provides students with a centralized interface to:

- Browse faculty profiles
- Submit structured teacher reviews
- Access past examination papers
- View which papers teachers have set
- Explore course information

The project demonstrates practical implementation of DBMS concepts integrated into a modern full-stack web application.

---

# Tech Stack

## Frontend
- React.js
- CSS
- Functional Components & Hooks

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL
- Neon Serverless PostgreSQL

---

# Core Features

## Teacher Directory
- Faculty listing with live search
- Department and designation display
- PhD supervisor badge
- Dynamic teacher ratings

## Teacher Reviews
- Multi-criteria rating system
- Star-based review interface
- Live rating updates
- Teacher feedback history

## Past Papers Repository
- Course-wise paper browsing
- Session and year tagging
- Difficulty indicators
- Embedded PDF preview support

## Course Catalogue
- Course codes and credit hours
- Dynamic paper count using SQL JOINs

## Rating Engine
- 4-criteria teacher evaluation
- Automatic average calculation
- PostgreSQL UPSERT summary updates

---

# Database Design

The database schema is normalized to **Third Normal Form (3NF)**.

## Tables

### teachers
```sql
id SERIAL PRIMARY KEY
name VARCHAR NOT NULL
designation VARCHAR
department VARCHAR
email VARCHAR
photo TEXT
phd_supervisor BOOLEAN DEFAULT FALSE
````

### courses

```sql
id SERIAL PRIMARY KEY
name VARCHAR NOT NULL
code VARCHAR UNIQUE
credit_hours INTEGER
```

### exam_papers

```sql
id SERIAL PRIMARY KEY
course_id INTEGER REFERENCES courses(id)
session VARCHAR
year INTEGER
link TEXT
difficulty VARCHAR
```

### teacher_exam_papers

```sql
id SERIAL PRIMARY KEY
teacher_id INTEGER REFERENCES teachers(id)
exam_paper_id INTEGER REFERENCES exam_papers(id)
assigned_at TIMESTAMP DEFAULT NOW()
```

### teacher_reviews

```sql
id SERIAL PRIMARY KEY
teacher_id INTEGER REFERENCES teachers(id)
teaching_clarity INTEGER CHECK (teaching_clarity BETWEEN 1 AND 5)
subject_knowledge INTEGER CHECK (subject_knowledge BETWEEN 1 AND 5)
behaviour_respect INTEGER CHECK (behaviour_respect BETWEEN 1 AND 5)
punctuality INTEGER CHECK (punctuality BETWEEN 1 AND 5)
comment TEXT
created_at TIMESTAMP DEFAULT NOW()
```

### teacher_rating_summary

```sql
teacher_id INTEGER PRIMARY KEY REFERENCES teachers(id)
overall_avg NUMERIC(4,2)
total_reviews INTEGER
```

---

# Key SQL Queries

## Teacher Listing with Ratings

```sql
SELECT t.id, t.name, t.designation, t.department,
       t.email, t.photo, t.phd_supervisor,
       trs.overall_avg AS rating
FROM teachers t
LEFT JOIN teacher_rating_summary trs
ON trs.teacher_id = t.id
ORDER BY t.name;
```

## Papers Set by a Teacher

```sql
SELECT ep.id, ep.session, ep.year, ep.difficulty,
       c.name AS course_name, c.code AS course_code
FROM teacher_exam_papers tep
JOIN exam_papers ep ON ep.id = tep.exam_paper_id
JOIN courses c ON c.id = ep.course_id
WHERE tep.teacher_id = $1
ORDER BY ep.year DESC, ep.session;
```

## Rating Summary UPSERT

```sql
INSERT INTO teacher_rating_summary
(teacher_id, overall_avg, total_reviews)
SELECT teacher_id,
ROUND(AVG(
(teaching_clarity + subject_knowledge +
behaviour_respect + punctuality) / 4.0
), 2),
COUNT(*)
FROM teacher_reviews
WHERE teacher_id = $1
GROUP BY teacher_id
ON CONFLICT (teacher_id)
DO UPDATE SET
overall_avg = EXCLUDED.overall_avg,
total_reviews = EXCLUDED.total_reviews;
```

---

# REST API Endpoints

| Method | Endpoint                          | Status   |
| ------ | --------------------------------- | -------- |
| GET    | `/api/teachers`                   | Complete |
| POST   | `/api/teachers`                   | Complete |
| GET    | `/api/courses`                    | Complete |
| POST   | `/api/courses`                    | Complete |
| GET    | `/api/pastpapers/:courseId`       | Complete |
| POST   | `/api/pastpapers`                 | Complete |
| GET    | `/api/teacher-reviews/:teacherId` | Complete |
| POST   | `/api/teacher-reviews`            | Complete |
| GET    | `/api/teacher-rating/:teacherId`  | Complete |
| GET    | `/api/teacher-papers/:teacherId`  | Complete |

---

# Frontend Components

## TeacherReview.jsx

Main page handling teacher listing and detail view.

## TeacherItem.jsx

Reusable teacher card component.

## StarRating.jsx

Interactive 5-star rating widget.

## CoursePage.jsx

Displays courses with paper counts.

## PastPapers.jsx

Shows past exam papers with difficulty badges and PDF embeds.

---

# Rating Logic

Each review contains four criteria:

* Teaching Clarity
* Subject Knowledge
* Behaviour & Respect
* Punctuality

### Calculation

```text
Total Score = Sum of all criteria (0–20)

Average Rating = Total Score / 4 (0.0–5.0)
```

Ratings are recalculated automatically using PostgreSQL UPSERT operations.

---

# Challenges Encountered

| Challenge                                   | Resolution                                  |
| ------------------------------------------- | ------------------------------------------- |
| Neon returned lowercase column names        | Updated React props to lowercase            |
| Promise.all crashing on invalid JSON        | Added `.ok` checks and try/catch            |
| `teacher-papers` route returning Cannot GET | Saved route file and restarted server       |
| Ratings not updating live                   | Re-fetched reviews and summaries after POST |
| Search clear not resetting results          | Added explicit reset state handling         |

---

# Testing

## API Testing

* Verified all GET endpoints
* Tested POST review submission
* Validated JOIN queries
* Checked error handling

## Frontend Testing

* Teacher search functionality
* Star rating interactions
* Review validation
* Exam paper rendering
* Live rating updates

---

# Results

| Feature                 | Status   |
| ----------------------- | -------- |
| PostgreSQL Schema (3NF) | Complete |
| Express REST API        | Complete |
| Teacher Directory       | Complete |
| Review System           | Complete |
| Rating Recalculation    | Complete |
| Past Papers Repository  | Complete |
| Teacher-Paper Mapping   | Complete |
| Responsive Layout       | Complete |
| Course Catalogue        | Complete |

---

# Future Enhancements

* JWT Authentication
* Admin Dashboard
* Analytics & Charts
* React Native Mobile App
* LMS Integration

---

# Conclusion

Red-Track-StudentHub successfully demonstrates the development of a complete database-driven web application using modern full-stack technologies.

The project applies key DBMS concepts including:

* ER Modeling
* 3NF Normalization
* SQL JOINs
* Aggregate Functions
* Referential Integrity
* UPSERT Operations

The architecture combines:

* React Frontend
* Express Backend
* PostgreSQL Database

This project serves as a strong foundation for future scalability and feature expansion.

---

# Authors

* Mushaf Ali Mir — 24P-0582
* Adnan Osama — 24K-0598
* Zaid Bin Zubair — 24K-0796

---

# References

1. PostgreSQL Documentation — [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)
2. Neon PostgreSQL — [https://neon.tech/docs/](https://neon.tech/docs/)
3. React Documentation — [https://react.dev/](https://react.dev/)
4. Express.js Documentation — [https://expressjs.com/](https://expressjs.com/)
5. node-postgres — [https://node-postgres.com/](https://node-postgres.com/)

```
```
