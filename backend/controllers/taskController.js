const Task = require('../models/taskModel');
const asyncHandler = require('express-async-handler');

const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, status, deadline, user } = req.body;
        console.log(req.user._id);

        if (!title || !description || !status || !deadline || !user) {
            res.status(400);
            throw new Error("Please fill all the fields");
        }

        const newTask = new Task({ title, description, status, deadline, user });
        const createdTask = await newTask.save();

        return res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: 'Error in creating task', error: error.message });
    }
});


const getAllTask = asyncHandler(async (req, res) => {
    const tasks = await Task.find({}).populate('user', 'name');
    res.status(200).json(tasks);
});



const updateTask = asyncHandler(async (req, res) => {
    const { title, description, status, deadline, taskId,user } = req.body; 

    const updateTask = await Task.findById(taskId); 
    console.log(updateTask)
    if (!updateTask) {
        res.status(404); 
        throw new Error("Task not found");
    }

    
    if (updateTask._id.toString() !== taskId) {
        res.status(401);
        throw new Error("You cannot perform this action");
    }

    if (updateTask) {
        updateTask.title = title;
        updateTask.description = description;
        updateTask.status = status;
        updateTask.deadline = deadline;
        updateTask.user = user
        
        const updated = await updateTask.save();
        res.json(updated);
    }
    else {
        res.status(401)
        throw new Error("note doesnt found");
    }
});



module.exports = { createTask , getAllTask,updateTask };
