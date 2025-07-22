import React, { useState } from 'react';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        photoUrl: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log(form);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white md:border-2  md:border-orange-200 rounded-lg mt-10 mb-10">
            
                <h2 className="text-2xl font-bold mb-6 text-center">Register for Watchly</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Photo URL</label>
                        <input
                            type="url"
                            name="photoUrl"
                            value={form.photoUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
                    >
                        Register
                    </button>
                </form>
            
        </div>
    );
};

export default Register;