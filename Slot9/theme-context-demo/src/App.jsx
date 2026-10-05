import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Xin chào, {user.username}</h2>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {/* AuthProvider bọc BrowserRouter hoặc ngược lại đều được.
          Nếu Provider cần dùng useNavigate thì Provider phải nằm TRONG BrowserRouter. */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}