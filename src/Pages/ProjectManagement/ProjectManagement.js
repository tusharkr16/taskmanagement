import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProjectManagement = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        creationDate: "",
        owner: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem("userInfo")); 

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`, 
        },
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAddProject = async (e) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            description: form.description,
            status: "inProgress", 
            deadline: form.creationDate,
            user: "678c2e5a3e37493ce88ced93", 
        };

        try {
            if (isEditing) {
                const updatedProjects = [...projects];
                updatedProjects[editIndex] = form;
                setProjects(updatedProjects);
                setIsEditing(false);
            } else {
                // Call the API to create a task
                const { data } = await axios.post(
                    "http://localhost:4000/api/task/create",
                    payload,
                    config
                );
                console.log("Task Created:", data);
                toast.success("Task Created");
                navigate('/your-task', { replace: true });


                // Add the created task to the UI
                setProjects([...projects, form]);
            }
        } catch (error) {
            console.error("Error creating task:", error.response?.data || error.message);
        }

        setForm({ title: "", description: "", creationDate: "", owner: "" });
    };

    const handleEditProject = (index) => {
        setForm(projects[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDeleteProject = (index) => {
        const updatedProjects = projects.filter((_, i) => i !== index);
        setProjects(updatedProjects);
    };

    return (
        <div
            className="min-h-screen bg-gray-100 py-10 px-4"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1735597693189-9ba81b5bbc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            }}
        >
            <div className="max-w-4xl mx-auto bg-opacity-90 mt-24 lg:mt-1 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Project Management
                </h1>

                <form onSubmit={handleAddProject} className="mb-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Project Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter project title"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter project description"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Creation Date</label>
                        <input
                            type="date"
                            name="creationDate"
                            value={form.creationDate}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Project Owner</label>
                        <input
                            type="text"
                            name="owner"
                            value={form.owner}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter project owner"
                        />
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
                        {isEditing ? "Update Project" : "Add Project"}
                    </button>
                </form>

                <h2 className="text-xl font-bold text-gray-800 mb-4">Projects</h2>
                <div className="space-y-4">
                    {projects.length === 0 ? (
                        <p className="text-gray-600">No projects available. Add a project to get started!</p>
                    ) : (
                        projects.map((project, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm flex justify-between items-start"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                                    <p className="text-gray-600">{project.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Created on: {new Date(project.creationDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500">Owner: {project.owner}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditProject(index)}
                                        className="py-1 px-3 bg-yellow-500 text-white text-sm rounded-md shadow hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProject(index)}
                                        className="py-1 px-3 bg-red-500 text-white text-sm rounded-md shadow hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectManagement;
