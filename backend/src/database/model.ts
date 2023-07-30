import mongoose from "mongoose";

export type TaskDocument = mongoose.Document & {
    title: string;
    date: Date;
    isCompleted: boolean;
}

const TaskSchema = new mongoose.Schema<TaskDocument>({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    isCompleted: {type: Boolean, required: true, default: false},
});



export const Task = mongoose.model<TaskDocument>("TaskSchema", TaskSchema);
