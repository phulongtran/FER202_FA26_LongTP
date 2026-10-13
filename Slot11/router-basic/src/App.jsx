
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import StudentDirectoryPage from "./pages/StudentDirectoryPage";

// Giữ các trang Bài 4 nếu bạn vẫn cần sử dụng.
import RegisterPage from "./pages/RegisterPage";
import SuccessPage from "./pages/SuccessPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Bài 5: Danh bạ sinh viên */}
        <Route index element={<StudentDirectoryPage />} />

        {/* Các trang từ Bài 4 */}
        <Route path="register" element={<RegisterPage />} />
        <Route path="success" element={<SuccessPage />} />

        {/* Đường dẫn không tồn tại */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
