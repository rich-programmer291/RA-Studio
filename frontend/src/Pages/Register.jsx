// pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const securityQuestions = [
    "What is the name of your first pet?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite book?",
    "What city were you born in?"
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/90 p-8 rounded shadow"
      >

        <h2 className="text-2xl font-bold text-center">Register</h2>
        <Link to="/login" className="flex justify-center text-center text-blue-600 mb-6">
          <span className="text-sm text-center text-blue-600 hover:underline">Already have an account? Log in</span>
        </Link>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full outline-none border border-blue-300/30 focus:border-b-blue-400 border-b-2 border-b-blue-300 mb-4 px-4 py-2  rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full outline-none border border-blue-300/30 focus:border-b-blue-400 border-b-2 border-b-blue-300 mb-4 px-4 py-2  rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full outline-none border border-blue-300/30 focus:border-b-blue-400 border-b-2 border-b-blue-300 mb-4 px-4 py-2  rounded"
          required
        />

        <select
          className="w-full text-gray-500 outline-none border border-blue-300/30 focus:border-b-blue-400 border-b-2 border-b-blue-300 mb-4 px-4 py-2  rounded"
          name="securityQuestion" onChange={handleChange} required>
          <option value="">-- Select a security question --</option>
          {securityQuestions.map((q, idx) => (
            <option key={idx} value={q}>{q}</option>
          ))}
        </select>

        <input
          type="text"
          name="securityAnswer"
          value={form.securityAnswer}
          onChange={handleChange}
          placeholder="Security Answer"
          className="w-full outline-none border border-blue-300/30 focus:border-b-blue-400 border-b-2 border-b-blue-300 mb-4 px-4 py-2  rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
