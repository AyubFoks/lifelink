import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DonationRequestForm() {
  const { hospital } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    resourceType: "Blood Type A+",
    quantity: 1,
    urgency: "Normal",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API}/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, hospitalId: hospital.id }),
    });
    nav("/requests");
  };

  return (
    <div className="form-wrapper">
      <h2>Request Donation</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Resource Type
          <select name="resourceType" value={form.resourceType} onChange={handleChange}>
            <option>Blood Type A+</option>
            <option>Blood Type O-</option>
            <option>Plasma</option>
            <option>Platelets</option>
          </select>
        </label>

        <label>
          Quantity (Units)
          <input type="number" name="quantity" min="1" value={form.quantity} onChange={handleChange} required />
        </label>

        <label>
          Urgency
          <select name="urgency" value={form.urgency} onChange={handleChange}>
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </label>

        <label>
          Additional Notes
          <textarea name="notes" value={form.notes} onChange={handleChange} />
        </label>

        <button type="submit">Submit Request</button>
        <button type="button" onClick={() => nav("/")}>Cancel</button>
      </form>
    </div>
  );
}