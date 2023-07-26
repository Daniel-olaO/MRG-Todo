"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.TaskModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    username: { type: String },
    title: { type: String, required: true },
    time: { type: Date, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
});
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: false },
    authentication: {
        password: { type: String, required: true, selected: false },
        salt: { type: String, required: true, select: false },
    }
});
exports.TaskModel = mongoose_1.default.model("TaskSchema", TaskSchema);
exports.UserModel = mongoose_1.default.model("UserSchema", UserSchema);
//# sourceMappingURL=model.js.map