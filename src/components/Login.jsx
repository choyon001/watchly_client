import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white md:border-2  md:border-orange-200 rounded-lg mt-10 mb-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Login to Watchly</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none  focus:border-orange-200"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded focus:outline-none  focus:border-orange-200"
                    />
                </div>
                <div className="mb-4 text-right">
                    <a href="/forgot-password" className="text-sm text-orange-600 hover:underline">
                        Forgot Password?
                    </a>
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;