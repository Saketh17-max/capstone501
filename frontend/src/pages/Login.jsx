import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);

      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (loggedUser?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div>
      <h1>Sports Scheduler</h1>
      <h2>Login</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;