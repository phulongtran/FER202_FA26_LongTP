
import { Navigate, Routes, Route } from "react-router-dom";

import CourseListPage from "./pages/CourseListPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { AppNavbar } from "./components/AppNavbar";
import "./App.css";

function App() {
  return (
    <>
    <AppNavbar />
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/courses" replace />}
      />

      <Route
        path="/courses"
        element={<CourseListPage />}
      />

      <Route
        path="/courses/:code"
        element={<CourseDetailPage />}
      />

      <Route
        path="*"
        element={<Navigate to="/courses" replace />}
      />
    </Routes>

</>
  );
}

export default App;
