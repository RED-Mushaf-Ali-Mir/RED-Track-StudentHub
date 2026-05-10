import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import ReactDom from "react-dom/client";
import CoursePapers from "./components/pages/CoursePapers";
import Home from "./components/pages/Home";
import TeacherReview from "./components/pages/TeacherReview";
import Calculator from "./components/pages/Calculator";
import NotFound from "./components/pages/NotFound";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

const pastPapers = [
  {
    id: "Course-1",
    session: "Fall",
    year: "2024",
    link: "https://www.youtube.com/",
    papers: "4",
    difficulty: "",
  },
  {
    id: "Course-1",
    session: "Spring",
    year: "2021",
    link: "https://www.youtube.com/",
    papers: "3",
    difficulty: "",
  },
  {
    id: "Course-2",
    session: "Fall",
    year: "2023",
    link: "https://www.youtube.com/",
    papers: "4",
    difficulty: "",
  },
  {
    id: "Course-4",
    session: "Fall",
    year: "2019",
    link: "https://www.youtube.com/",
    papers: "4",
    difficulty: "",
  },
  {
    id: "Course-4",
    session: "Fall",
    year: "2014",
    link: "https://www.youtube.com/",
    papers: "4",
    difficulty: "",
  },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/Pastpapers"
        element={<CoursePapers pastPapers={pastPapers} />}
      />
      <Route path="/GpaCalculator" element={<Calculator courses={[]} />} />
      <Route path="/TeacherReview" element={<TeacherReview />} />
    </Route>,
  ),
);

ReactDom.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
