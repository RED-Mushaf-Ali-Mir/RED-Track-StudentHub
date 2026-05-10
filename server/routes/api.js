import express from "express";
import pool from "../db.js";

const router = express.Router();

/* ─────────────────────────────────────────
   COURSES — count papers live from exam_papers via JOIN
───────────────────────────────────────── */

router.get("/courses", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        c.id,
        c.name,
        c.code,
        c.credit_hours,
        CAST(COUNT(ep.id) AS INTEGER) AS papers
      FROM courses c
      LEFT JOIN exam_papers ep ON ep.course_id = c.id
      GROUP BY c.id, c.name, c.code, c.credit_hours
      ORDER BY c.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/courses", async (req, res) => {
  try {
    const { name, code, credit_hours } = req.body;
    const result = await pool.query(
      `INSERT INTO courses (name, code, credit_hours)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, code, credit_hours],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────
   TEACHERS
───────────────────────────────────────── */

router.get("/teachers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        t.id,
        t.name,
        t.designation,
        t.department,
        t.email,
        t.photo,
        t.phd_supervisor,
        trs.overall_avg AS rating
      FROM teachers t
      LEFT JOIN teacher_rating_summary trs ON trs.teacher_id = t.id
      ORDER BY t.name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/teachers", async (req, res) => {
  try {
    const {
      name,
      designation,
      department,
      email,
      photo,
      phd_supervisor,
      rating,
    } = req.body;
    const result = await pool.query(
      `INSERT INTO teachers (name, designation, department, email, photo, phd_supervisor, rating)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, designation, department, email, photo, phd_supervisor, rating],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────
   TEACHER REVIEWS
───────────────────────────────────────── */

// GET all reviews for a specific teacher
router.get("/teacher-reviews/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await pool.query(
      "SELECT * FROM teacher_reviews WHERE teacher_id = $1 ORDER BY created_at DESC",
      [teacherId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST a new review — also recalculates rating summary
router.post("/teacher-reviews", async (req, res) => {
  try {
    const {
      teacher_id,
      teaching_clarity,
      subject_knowledge,
      behaviour_respect,
      punctuality,
      comment,
    } = req.body;

    // Insert the review
    const reviewResult = await pool.query(
      `INSERT INTO teacher_reviews
         (teacher_id, teaching_clarity, subject_knowledge, behaviour_respect, punctuality, comment)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        teacher_id,
        teaching_clarity,
        subject_knowledge,
        behaviour_respect,
        punctuality,
        comment,
      ],
    );

    // Recalculate and upsert rating summary
    await pool.query(
      `INSERT INTO teacher_rating_summary (teacher_id, overall_avg, total_reviews)
       SELECT
         teacher_id,
         ROUND(AVG((teaching_clarity + subject_knowledge + behaviour_respect + punctuality) / 4.0), 2),
         COUNT(*)
       FROM teacher_reviews
       WHERE teacher_id = $1
       GROUP BY teacher_id
       ON CONFLICT (teacher_id) DO UPDATE
         SET overall_avg   = EXCLUDED.overall_avg,
             total_reviews = EXCLUDED.total_reviews`,
      [teacher_id],
    );

    res.json(reviewResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────
   TEACHER RATING SUMMARY
───────────────────────────────────────── */

router.get("/teacher-rating/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await pool.query(
      "SELECT * FROM teacher_rating_summary WHERE teacher_id = $1",
      [teacherId],
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────
   EXAM PAPERS
───────────────────────────────────────── */

router.get("/pastpapers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM exam_papers");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/pastpapers/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await pool.query(
      "SELECT * FROM exam_papers WHERE course_id = $1 ORDER BY year DESC",
      [courseId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/pastpapers", async (req, res) => {
  try {
    const { course_id, session, year, link, difficulty } = req.body;
    const result = await pool.query(
      `INSERT INTO exam_papers (course_id, session, year, link, difficulty)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [course_id, session, year, link, difficulty],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

/* ─────────────────────────────────────────
   TEACHER EXAM PAPERS
───────────────────────────────────────── */

router.get("/teacher-papers/:teacherId", async (req, res) => {
  try {
    const { teacherId } = req.params;
    const result = await pool.query(
      `SELECT
         ep.id,
         ep.session,
         ep.year,
         ep.difficulty,
         c.name  AS course_name,
         c.code  AS course_code
       FROM teacher_exam_papers tep
       JOIN exam_papers ep ON ep.id = tep.exam_paper_id
       JOIN courses     c  ON c.id  = ep.course_id
       WHERE tep.teacher_id = $1
       ORDER BY ep.year DESC, ep.session`,
      [teacherId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
