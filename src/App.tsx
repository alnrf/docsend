import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import { FileUpload } from "./pages/FileUpload";
import { Home } from "./pages/Home";
import { AdminLogin } from "./pages/AdminLogin";
import { UserLogin } from "./pages/UserLogin";
import { MainDashboard } from "./pages/MainDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/user/:path" element={<UserLogin />} />
      <Route path="/upload" element={<FileUpload />} />
      <Route
        path="/admin/home"
        element={
          <ProtectedRoute>
            <MainDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
