"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = require("../database/model");
exports.User = {
    register_user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password, email } = req.body;
            const user = yield model_1.UserModel.create({ username, password, email });
            res.status(201).json({ user });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
    check_user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const result = yield model_1.UserModel.findOne({ username: username });
            if (result) {
                const isPasswordValid = yield bcrypt_1.default.compare(password, result.authentication.password);
                if (isPasswordValid) {
                    res.status(200).json({ message: "login successful" });
                }
            }
            else {
                res.status(404).json({ message: "user not found" });
            }
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
};
exports.Task = {
    create_task: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, time } = req.body;
            const task = yield model_1.TaskModel.create({ title, time });
            res.status(201).json({ task });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
    get_task: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const task = yield model_1.TaskModel.find({ username: req.params.username });
            res.status(200).json({ task });
        }
        catch (error) {
            res.status(500).json({ error });
        }
    }),
    update_task: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const task = yield model_1.TaskModel.findById(req.params.id);
            if (task) {
                const { title, time } = req.body;
                const updatedTask = yield model_1.TaskModel.findByIdAndUpdate(req.params.id, { title, time });
                res.status(200).json({ updatedTask });
            }
            else {
                res.status(404).json({ message: "task not found" });
            }
        }
        catch (error) {
            res.status(404).json({ message: "task not found" });
        }
    }),
    complete_task: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const update = { isCompleted: true };
        try {
            const task = yield model_1.TaskModel.findByIdAndUpdate(req.params.id, update);
            if (task) {
                res.status(200).json(task);
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }),
    delete_task: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const task = yield model_1.TaskModel.findByIdAndDelete(req.params.id);
            res.status(200).end();
        }
        catch (error) {
            res.status(400).json({ error });
        }
    })
};
//# sourceMappingURL=controllers.js.map