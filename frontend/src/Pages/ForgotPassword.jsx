import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from 'react'
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [username, setUsername] = React.useState('');
    const [securityAnswer, setSecurityAnswer] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [securityQuestion, setSecurityQuestion] = React.useState('');

    const navigate = useNavigate();

    const fetchSecurityQuestion = async () => {
        const res = await fetch(`https://ra-studio.onrender.com/api/auth/security-question`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setSecurityQuestion(data.securityQuestion);
        } else {
            setSecurityQuestion('');
            toast.error(data.message || 'Failed to fetch security question');
        }
    }

    const handleForgotPassword = async () => {
        const res = await fetch('https://ra-studio.onrender.com/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, securityAnswer, newPassword }),
        });

        const data = await res.json();

        if (res.ok) {
            toast.success('Password Reset Successfully');
            navigate('/login');
        } else {
            toast.error(data.message || 'Failed to send reset link');
        }
    }
    return (
        <div>
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
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleForgotPassword();
                    }}
                    className="text-white w-full max-w-md bg-black/10 p-8 rounded-md shadow py-12 backdrop-blur-md border border-black"
                >
                    <Link to="/login" className="flex items-center text-white rounded-full w-[max-content]">
                        <ArrowLeft />
                    </Link>
                    <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full text-white placeholder-blue-100/50 border-b-2 border-blue-300 focus:border-blue-500 outline-none mb-4 px-4 py-2 bg-white/10 rounded"
                            required
                        />
                    </div>

                    {securityQuestion ? (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Your Security Question</label>
                            <p className="p-2 bg-gray-100 border border-gray-300 rounded text-black">{securityQuestion}</p>
                        </div>
                    ) : (<div onClick={fetchSecurityQuestion} className="mb-4 cursor-pointer">
                        <span className="block text-xs font-medium mb-2 text-blue-200">Click to see your Security question</span>
                    </div>)}

                    <div className="mb-4">
                        <input
                            type="text"
                            value={securityAnswer}
                            placeholder="Answer to your security question"
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                            className="w-full text-white placeholder-blue-100/50 border-b-2 border-blue-300 focus:border-blue-500 outline-none mb-4 px-4 py-2 bg-white/10 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={newPassword}
                            placeholder="New Password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full text-white placeholder-blue-100/50 border-b-2 border-blue-300 focus:border-blue-500 outline-none mb-4 px-4 py-2 bg-white/10 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;