import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import api from "./routes/api.js";
import pool from "./db.js";

dotenv.config();

const app = express();

/* middleware */
app.use(cors());
app.use(express.json());

/* test database connection */
pool
  .query("SELECT 1")
  .then(() => console.log("Neon PostgreSQL Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

/* routes */
app.use("/api", api);

/* health check */
app.get("/", (req, res) => {
  res.send("Server running");
});

/* global error handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

/* start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
