import React, { useState } from 'react';

export default function RequestForm({ onSubmit }) {
  const [form, setForm] = useState({
    patientBloodGroup: '',
    facility: '',
    location: '',
    units: 1,
    urgent: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newReq = {
      ...form,
      id: 'REQ-' + Date.now(),
      status: 'Pending',
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    onSubmit(newReq);
    setForm({ patientBloodGroup: '', facility: '', location: '', units: 1, urgent: false });
  };

  return (
    <form onSubmit={handleSave}>
      {/* Blood Group */}
      <select
        name="patientBloodGroup"
        required
        value={form.patientBloodGroup}
        onChange={handleChange}
      >
        <option value="" disabled>Select blood group</option>
        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
          <option key={group} value={group}>{group}</option>
        ))}
      </select>

      {/* Facility */}
      <input
        name="facility"
        placeholder="Patient facility / hospital"
        required
        value={form.facility}
        onChange={handleChange}
      />

      {/* Location */}
      <input
        name="location"
        placeholder="Location"
        required
        value={form.location}
        onChange={handleChange}
      />

      {/* Units */}
      <input
        name="units"
        type="number"
        min={1}
        placeholder="Units"
        required
        value={form.units}
        onChange={handleChange}
      />

      {/* Urgent Checkbox */}
      <label>
        <input
          name="urgent"
          type="checkbox"
          checked={form.urgent}
          onChange={handleChange}
        />
        Urgent
      </label>

      {/* Submit Button */}
      <button type="submit">Create Request</button>
    </form>
  );
}
