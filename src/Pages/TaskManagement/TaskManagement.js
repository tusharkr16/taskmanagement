import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "To-Do",
        deadline: "",
        assignedUser: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem("userInfo")); 

    
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo?.token}`,
                    },
                };
                const { data } = await axios.get("http://localhost:4000/api/task/tasks", config);
                setTasks(data); 
            } catch (error) {
                console.error("Error fetching tasks:", error.response?.data || error.message);
            }
        };

        fetchTasks();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = form;
            setTasks(updatedTasks);
            setIsEditing(false);
        } else {
            setTasks([...tasks, form]);
        }
        setForm({
            title: "",
            description: "",
            status: "To-Do",
            deadline: "",
            assignedUser: "",
        });
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setForm(tasks[index]);
        setIsEditing(true);
        setEditIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleAddTask = () => {
        setForm({
            title: "",
            description: "",
            status: "To-Do",
            deadline: "",
            assignedUser: "",
        });
        setIsEditing(false);
        setShowForm(true);
    };

    return (
        <div
            className="min-h-screen bg-gray-100 py-10 px-4"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1735597693189-9ba81b5bbc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
        >
            <div className="max-w-5xl mx-auto bg-opacity-90 bg-white mt-24 lg:mt-2 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Task Management
                </h1>

                {!showForm && (
                    <button
                        onClick={handleAddTask}
                        className="mb-6 py-2 px-4 bg-blue-500 text-white font-medium text-lg rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Add Task
                    </button>
                )}

                {showForm && (
                    <form onSubmit={handleFormSubmit} className="mb-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter task title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Assigned User
                                </label>
                                <input
                                    type="text"
                                    name="assignedUser"
                                    value={form.assignedUser}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter assigned user"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter task description"
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="To-Do">To-Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Deadline
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={form.deadline}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 rounded-md shadow text-white ${
                                isEditing
                                    ? "bg-yellow-500 hover:bg-yellow-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                isEditing ? "focus:ring-yellow-400" : "focus:ring-blue-400"
                            }`}
                        >
                            {isEditing ? "Update Task" : "Add Task"}
                        </button>
                    </form>
                )}

                {/* Task Table */}
                <h2 className="text-xl font-bold text-gray-800 mb-4">Task List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Assigned User</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Deadline</th>
                                <th className="border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task._id || index} className="text-gray-800">
                                    <td className="border px-4 py-2">{task.title}</td>
                                    <td className="border px-4 py-2">{task.user?.name || "Unassigned"}</td>
                                    <td className="border px-4 py-2">{task.status}</td>
                                    <td className="border px-4 py-2">
                                        {new Date(task.deadline).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2 flex space-x-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="py-1 px-3 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="py-1 px-3 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;
