import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar/Navbar.jsx';
import Footer from '../../components/common/Footer/Footer.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import authService from '../../services/authService';
import Button from '../../components/ui/Button.jsx';
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    blood_type: user?.blood_type || '',
    location: user?.location || '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authService.patch('/auth/profile', form);
      if (res?.data) {
        setMessage({ type: 'success', text: 'Profile updated.' });
        // refresh global profile
        if (refreshProfile) await refreshProfile();
      } else {
        setMessage({ type: 'error', text: res?.error?.message || 'Failed to update' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err?.message || 'Failed to update' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 px-6 py-20">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <Button variant="secondary" className="mb-4 text-white py-2 px-3" onClick={() => navigate('/dashboard/donor')}>&larr; Back to Dashboard</Button>
          <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
          {message && <div className={`mb-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</div>}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label className="block text-sm">Full name</label>
              <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Blood type</label>
              <input name="blood_type" value={form.blood_type} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Location</label>
              <input name="location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <div>
              <Button className="text-white py-2 px-3" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
