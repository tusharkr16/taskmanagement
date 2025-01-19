const express = require('express');
const { createTask,getAllTask, updateTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

// router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createTask);
router.get("/tasks", protect, getAllTask);
router.put("/update",protect,updateTask)
// router.route('/:id').get(getNotesById).put(protect, updateNote).delete(protect, deleteNote)


module.exports = router;