import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateSession from "./pages/CreateSession";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
  return (
    <div className="hero-section">
      <h1>Welcome to Sports Scheduler</h1>
      <p>Organize, join, and manage your sports sessions with ease.</p>
      <div className="flex-row" style={{ marginTop: '2rem', justifyContent: 'center' }}>
        <Link to="/register"><button>Get Started</button></Link>
        <Link to="/login"><button className="btn-outline">Login</button></Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions/create"
          element={
            <ProtectedRoute>
              <CreateSession />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;