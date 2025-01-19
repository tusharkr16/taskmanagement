const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
            required:true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Auth",
        },
    },
    {
        timestamps: true,
    }
);

const Note = mongoose.model("Task", noteSchema);

module.exports = Note;