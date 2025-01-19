import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div
                className="flex items-center justify-center min-h-screen bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1735597693189-9ba81b5bbc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                }}
            >
                <div className="w-full max-w-md p-8 bg-white bg-opacity-80 shadow-lg rounded-lg mx-7 my-7">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Task Management Portal</h1>
                    <h5 className="text-lg text-center text-gray-600 mb-6">
                        Manage your tasks and assignments in one place. Stay organized and boost your productivity!
                    </h5>

                    <div className="mb-6 text-center">
                        <p className="text-gray-700 mb-4">
                            Welcome to our task management portal, where you can create, manage, and track your tasks.
                            Whether you're working on personal projects or collaborating with a team, our platform
                            helps you stay on top of your deadlines and tasks.
                        </p>
                    </div>

                    <div className="flex justify-center mb-6">
                        <button
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 mx-3"
                            onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </button>
                        <button
                            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-200 mx-3"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Home;
