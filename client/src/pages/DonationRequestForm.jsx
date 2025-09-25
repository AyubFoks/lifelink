import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import authService from '../services/authService';
import Button from '../components/ui/Button';

export default function DonationRequestForm() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    patient_name: "",
    blood_type_needed: "A+",
    quantity: 1,
    urgency_level: "Normal",
    notes: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      patient_name: form.patient_name,
      blood_type_needed: form.blood_type_needed,
      quantity: Number(form.quantity),
      urgency_level: form.urgency_level,
    };
    const res = await authService.post('/requests', payload);
    if (res?.data) {
      nav('/dashboard/hospital/requests');
    } else {
      alert(res?.error?.message || 'Failed to create request');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-4">Create Blood Request</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <label className="block mb-2">
          Patient name
          <input name="patient_name" value={form.patient_name} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </label>

        <label className="block mb-2">
          Blood Type
          <select name="blood_type_needed" value={form.blood_type_needed} onChange={handleChange} className="w-full p-2 border rounded mt-1">
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </label>

        <label className="block mb-2">
          Quantity (Units)
          <input type="number" name="quantity" min="1" value={form.quantity} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
        </label>

        <label className="block mb-2">
          Urgency
          <select name="urgency_level" value={form.urgency_level} onChange={handleChange} className="w-full p-2 border rounded mt-1">
            <option>Normal</option>
            <option>Urgent</option>
            <option>Critical</option>
          </select>
        </label>

        <div className="flex gap-2 mt-4">
          <Button className= "text-white py-2 px-3" type="submit">Submit Request</Button>
          <Button className= "text-white py-2 px-3" variant="secondary" onClick={() => nav('/dashboard/hospital')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}