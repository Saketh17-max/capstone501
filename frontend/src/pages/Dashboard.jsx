import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  const [mySessions, setMySessions] = useState([]);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [joinedSessions, setJoinedSessions] = useState([]);
  const [error, setError] = useState("");

  const loadSessions = async () => {
    try {
      const [my, available, joined] = await Promise.all([
        api.get("/sessions/my"),
        api.get("/sessions/available"),
        api.get("/sessions/joined"),
      ]);

      setMySessions(my.data.sessions);
      setAvailableSessions(available.data.sessions);
      setJoinedSessions(joined.data.sessions);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load sessions");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSessions();
  }, []);

  const joinSession = async (id) => {
    try {
      await api.post(`/sessions/${id}/join`);
      loadSessions();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to join session");
    }
  };

  const cancelSession = async (id) => {
    const reason = prompt("Enter cancellation reason:");

    if (!reason?.trim()) return;

    try {
      await api.patch(`/sessions/${id}/cancel`, {
        reason,
      });

      loadSessions();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to cancel session");
    }
  };

  const SessionCard = ({ session, creator = false }) => (
    <div className="card">
      <h3>{session.sport?.name}</h3>

      <p>Date: {new Date(session.date).toLocaleString()}</p>
      <p>Venue: {session.venue}</p>
      <p>Players: {session.players?.length}</p>
      <p>Status: {session.status}</p>

      {session.status === "cancelled" && (
        <p>
          <strong>Reason:</strong> {session.cancellationReason}
        </p>
      )}

      {creator && session.status === "scheduled" && (
        <button onClick={() => cancelSession(session._id)}>
          Cancel Session
        </button>
      )}
    </div>
  );

  return (
    <div>
      <h2 className="mb-2">Dashboard Overview</h2>

      <div className="header-actions">
        <Link to="/sessions/create">
          <button>Create Session</button>
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <hr />

      <h2>My Created Sessions</h2>

      <div className="grid">
        {mySessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            creator
          />
        ))}
      </div>

      <hr />

      <h2>Available Sessions</h2>

      <div className="grid">
        {availableSessions.map((session) => (
          <div key={session._id}>
            <SessionCard session={session} />

            <button onClick={() => joinSession(session._id)}>
              Join Session
            </button>
          </div>
        ))}
      </div>

      <hr />

      <h2>Joined Sessions</h2>

      <div className="grid">
        {joinedSessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;