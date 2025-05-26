import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { InfoIcon, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      toast.info('You are already logged in');
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Login successful!');
      localStorage.setItem('token', data.token);
      navigate('/admin');
    } else {
      toast.error(data.message || 'Login failed');
    }
  };



  return (
    <div
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1580852300513-9b50125bf293?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
    >

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-black/10 p-8 rounded-md shadow py-12 backdrop-blur-md border border-black"
      >
        <Link to="/" className="flex items-center text-white rounded-full w-[max-content]">
          <ArrowLeft />
        </Link>
        <h2 className="text-2xl font-bold mb-2 text-center text-white">Admin Login</h2>
        <h6 className="text-xs text-center mb-1 flex items-center text-white justify-center gap-1">
          <InfoIcon className="text-blue-500" size={12} /> This is for Admins only.
        </h6>
        <Link
          to="/"
          className="text-xs flex justify-center mb-6 text-blue-200 underline"
        >
          Click here if you think you are here by mistake.
        </Link>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full text-white placeholder-blue-100/50 border-b-2 border-blue-300 focus:border-blue-500 outline-none mb-4 px-4 py-2 bg-white/10 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full text-white placeholder-blue-100/50 border-b-2 border-blue-300 focus:border-blue-500 outline-none mb-4 px-4 py-2 bg-white/10 rounded"
          required
        />
        <Link to='/forgot-password' className='text-white/90 text-xs underline racking-wider '>Forgot Password?</Link>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
