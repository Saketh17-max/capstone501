import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Sports Scheduler</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            {user.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}
            {user.role !== 'admin' && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
            <button onClick={handleLogout} className="btn-small">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
