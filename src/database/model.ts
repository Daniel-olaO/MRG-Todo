import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    username: { type: String},
    title: {type: String, required: true},
    time: {type: Date, required: true},
    isCompleted: {type: Boolean, required: true, default: false},
});

const UserSchema = new mongoose.Schema({ 
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: false },
    authentication : {
        password: { type: String, required: true, selected: false},
        salt: { type: String, required: true, select: false },
    }
});

export const TaskModel = mongoose.model("TaskSchema", TaskSchema);
export const UserModel = mongoose.model("UserSchema", UserSchema);
