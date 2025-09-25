import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DonationRequests() {
  const { hospital } = useAuth();
  const nav = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/requests?hospital=${hospital.id}`)
      .then((r) => r.json())
      .then(setRequests)
      .catch(() => {});
  }, [hospital]);

  return (
    <div className="requests-page">
      <header>
        <h2>My Donation Requests</h2>
        <button onClick={() => nav("/request")}>+ New Request</button>
        <button onClick={() => nav("/")}>Back to Dashboard</button>
      </header>

      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Resource</th>
            <th>Quantity</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Requested On</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.resourceType}</td>
              <td>{r.quantity} Units</td>
              <td>{r.urgency}</td>
              <td>{r.status}</td>
              <td>{new Date(r.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}