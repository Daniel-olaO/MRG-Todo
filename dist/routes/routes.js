"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/controllers");
exports.router = express_1.default.Router();
//user routes
exports.router.post('/register', controllers_1.User.register_user);
exports.router.post('/login', controllers_1.User.check_user);
//task routes
exports.router.post('/create-task', controllers_1.Task.create_task);
exports.router.get('/task/:userId', controllers_1.Task.get_task);
exports.router.put('/updatetask/:id', controllers_1.Task.update_task);
exports.router.put('/complete-task/:id', controllers_1.Task.complete_task);
exports.router.delete('/delete-task/:id', controllers_1.Task.delete_task);
//# sourceMappingURL=routes.js.map