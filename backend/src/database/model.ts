import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    id: {type: Number},
    title: {type: String, required: true},
    date: {type: Date, required: true},
    isCompleted: {type: Boolean, required: true, default: false},
});



export const Task = mongoose.model("TaskSchema", TaskSchema);
