import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { hospital, logout } = useAuth();
  const nav = useNavigate();
  const [inventory, setInventory] = useState([
    { resource: "Blood Type A+", qty: 15, status: "Available", updated: "2025-09-19" },
    { resource: "Blood Type O-", qty: 8, status: "Low", updated: "2025-09-09" },
  ]);
  const [requests, setRequests] = useState([
    { id: "REQ-01-001", resource: "Blood Type A+", qty: 10, status: "Fulfilled", updated: "2025-08-21" },
    { id: "REQ-01-002", resource: "Blood Type O-", qty: 5, status: "Pending", updated: "2025-09-03" },
  ]);

  // On mount, fetch real data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/inventory`)
      .then((r) => r.json())
      .then(setInventory)
      .catch(() => {});
    fetch(`${import.meta.env.VITE_API}/requests?hospital=${hospital.id}`)
      .then((r) => r.json())
      .then(setRequests)
      .catch(() => {});
  }, [hospital]);

  return (
    <div className="dashboard">
      <header>
        <h1>National Hospital Dashboard – {hospital.name}</h1>
        <button onClick={() => nav("/request")}>Request Donation</button>
        <button onClick={() => nav("/requests")}>Recent Requests</button>
        <button onClick={logout}>Logout</button>
      </header>

      <section>
        <h2>Current Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((i) => (
              <tr key={i.resource}>
                <td>{i.resource}</td>
                <td>{i.qty} Units</td>
                <td>{i.status}</td>
                <td>{i.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Recent Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Resource</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.resource}</td>
                <td>{r.qty} Units</td>
                <td>{r.status}</td>
                <td>{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}