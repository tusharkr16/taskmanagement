import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Screen from '../Screen';
import axios from 'axios';
import Loading from '../../component/Loading';
import Error from '../../component/Error';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const postDetails = async (pics) => {
        if (!pics) return setMessage('Please select an Image');
        setMessage(null);

        try {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'Notezipper');
            data.append('cloud_name', 'dpiud4zo4');

            const response = await fetch('https://api.cloudinary.com/v1_1/dpiud4zo4/image/upload', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();
            if (result.url) setPic(result.url.toString());
        } catch (err) {
            console.error('Error during image upload:', err);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        if (password !== confirmpassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        setError(null);
        try {
            const config = {
                headers: { 'Content-type': 'application/json' },
            };

            const { data } = await axios.post(
                'http://localhost:4000/api/users',
                { name, pic, email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/login', { replace: true });
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1735597693189-9ba81b5bbc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                }}
            >
                <div className="w-full max-w-md p-8 bg-white bg-opacity-90 shadow-lg rounded-lg mx-7 my-7">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
                    {error && <Error message={error} />}
                    {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
                    {loading && <Loading />}
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={name}
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={email}
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={password}
                                placeholder="Enter your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                value={confirmpassword}
                                placeholder="Confirm your password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full"
                                onChange={(e) => postDetails(e.target.files[0])}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-medium text-lg rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
            </>
        
    );
};

export default Register;
