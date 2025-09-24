import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDonor } from '../../context/DonorContext';
import LifelinkLogo from '../../assets/logos/lifelink-full-logo.svg';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import './RegisterPage.css';

export default function RegisterPage() {
  const { register } = useDonor();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', bloodType: 'O+' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setError('Please provide name and email.');
      return;
    }
    register(form);
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: 420, margin: '2rem auto' }}>
      <Card>
        <h2 style={{ marginBottom: '1rem' }}>Register</h2>
        <form onSubmit={submit} style={{ display: 'grid', gap: '0.75rem' }}>
          <div>
            <label>Email</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label>Password</label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <div>
            <label>Full name</label>
            <Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <Button type="submit">Create account</Button>
          {message && <p>{message}</p>}
        </form>
        <div style={{ margin: '1rem 0', textAlign: 'center' }}>
          <span>OR</span>
        </div>
        <Button onClick={googleLogin} variant="outline">Sign in with Google</Button>
      </Card>
    </div>
  )
}
