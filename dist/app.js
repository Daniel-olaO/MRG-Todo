"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes/routes");
const dbconfig_1 = require("./database/dbconfig");
const HTTP_PORT = process.env.HTTP_PORT || 8000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use('/api', routes_1.router);
(0, dbconfig_1.connect)();
app.listen(HTTP_PORT, () => {
    console.log(`Sever listening on ${HTTP_PORT}`);
});
//# sourceMappingURL=app.js.map